import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { CategoryModule } from "@modules/category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/category-service/src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
