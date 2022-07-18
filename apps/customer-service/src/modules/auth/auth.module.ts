import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from '@modules/customer/customer.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ContextService } from "@modules/auth/context.service";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    CustomerModule,
  ],
  providers: [AuthService, AuthResolver, ContextService],
})
export class AuthModule {}
