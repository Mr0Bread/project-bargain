import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { CustomerModule } from "@modules/customer/customer.module";
import { AuthModule } from "@modules/auth/auth.module";
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/customer-service/src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    CustomerModule,
    AuthModule
  ],
})
export class AppModule {}
