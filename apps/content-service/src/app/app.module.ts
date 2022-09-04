import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { DatabaseModule } from "@modules/database/database.module";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/content-service/src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
})
export class AppModule {}
