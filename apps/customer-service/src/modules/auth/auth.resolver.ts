import {
  Args,
  Resolver,
  Mutation, Query,
} from '@nestjs/graphql';
import { Prisma } from 'prisma-client';
import { AuthService } from './auth.service';
import { IMutation } from "../../graphql";

type CustomerResolver = Pick<IMutation, 'signUp' | 'signIn' | 'refreshAccessToken' | 'signOut'>

@Resolver('Customer')
export class AuthResolver implements CustomerResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('signOut')
  signOut(): boolean | Promise<boolean> {
    return this.authService.signOut();
  }

  @Mutation('signUp')
  async signUp(
    @Args('input')
      input: Prisma.CustomerCreateInput,
  ) {
    return this.authService.signUp(input);
  }

  @Mutation('signIn')
  async signIn(
    @Args('input')
      input: {
      email: string;
      password: string;
    },
  ) {
    const result = await this.authService.signIn(input);

    if (!result) {
      return {
         isSuccess: false,
      }
    }

    return {
      isSuccess: true,
      customer: result,
    }
  }

  @Query('isSignedIn')
  async isSignedIn() {
    return this.authService.isSignedIn();
  }

  @Mutation('refreshAccessToken')
  refreshAccessToken() {
    return this.authService.refreshAccessToken();
  }
}
