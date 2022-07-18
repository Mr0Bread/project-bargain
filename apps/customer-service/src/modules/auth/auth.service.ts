import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';
import { CustomerService } from '@modules/customer/customer.service';
import { DatabaseService } from '@modules/database/database.service';
import { ContextService } from './context.service';
import { Prisma } from 'prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
    private readonly customerService: CustomerService,
    private readonly contextService: ContextService,
  ) {}

  verifyAccessToken(accessToken: string): { email: string } | false {
    try {
      const result = this.jwtService.verify<{ email: string }>(accessToken);

      return result;
    } catch (error) {
      return false;
    }
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      const result = this.jwtService.verify<{ email: string }>(refreshToken);

      return result;
    } catch (error) {
      return false;
    }
  }

  hashPassword(password: string) {
    return pbkdf2Sync(password, 'salt', 10, 64, 'sha256').toString('hex');
  }

  signAccessToken(payload: Record<string, unknown>) {
    return this.jwtService.sign(payload);
  }

  signRefreshToken(payload: Record<string, unknown>) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
  }

  setAccessTokenOnContext(accessToken: string) {
    this.contextService.setSecureCookie('accessToken', accessToken);
  }

  setRefreshTokenOnContext(refreshToken: string) {
    this.contextService.setSecureCookie('refreshToken', refreshToken);
  }

  async signIn({ email, password }: { email: string; password: string }) {
    // Look for customer with given email
    const customer = await this.customerService.findUnique({
      email,
    });

    // If customer does not exist or password does not match
    // returns false
    if (!customer || customer.password !== this.hashPassword(password)) {
      return false;
    }

    this.setAccessTokenOnContext(this.signAccessToken({ email }));
    this.setRefreshTokenOnContext(this.signRefreshToken({ email }));

    return {
      email,
      name: customer.name,
      surname: customer.surname,
    };
  }

  async signUp(customer: Prisma.CustomerCreateInput) {
    const { password, email, name, surname } = customer;

    const existingCustomer = await this.customerService.findUnique({
      email,
    });

    if (existingCustomer) {
      throw new HttpException(
        'Customer with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = this.hashPassword(password);
    const newCustomer = await this.customerService.create({
      email,
      name,
      surname,
      password: hashedPassword,
    });

    this.setAccessTokenOnContext(this.signAccessToken({ email }));
    this.setRefreshTokenOnContext(this.signRefreshToken({ email }));

    return newCustomer;
  }

  // Checks if customer is signed in
  // Based on provided access token
  async isSignedIn() {
    const accessToken = this.contextService.getCookie('accessToken');

    // If access token is provided, but is not valid
    // customer considered as not signed in
    return !!(accessToken && this.verifyAccessToken(accessToken));
  }

  refreshAccessToken() {
    const accessToken = this.contextService.getCookie('accessToken');
    const refreshToken = this.contextService.getCookie('refreshToken');

    if (!accessToken || !refreshToken) {
      return false;
    }

    const verificationResult = this.verifyRefreshToken(refreshToken);

    if (!verificationResult) {
      return false;
    }

    const { email } = verificationResult;

    this.setAccessTokenOnContext(this.signAccessToken({ email }));

    return true;
  }

  async signOut() {
    this.contextService.setSecureCookie('accessToken', '');
    this.contextService.setSecureCookie('refreshToken', '');

    return true;
  }
}
