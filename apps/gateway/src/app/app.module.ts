import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { RemoteGraphQLDataSource } from "@apollo/gateway";
import type { Request, Response } from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: {
          // Limiting the origins to FE and Apollo Studio
          origin: "*",
          // Allow cookies to be sent
          credentials: true,
        },
        // Additional security measure
        csrfPrevention: true,
        // Creating context and passing parsed cookies, request and response to it
        context: ({ req, res }: { req: Request, res: Response }) => ({
          cookies: req.cookies,
          req,
          res,
        }),
        // Enable Apollo Studio as default GraphQL playground
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault(),
        ]
      },
      gateway: {
        // Customising subgraph service build process
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            // Modifying response to client from Gateway
            // Getting cookies from subgraph response and
            // Setting them to client response
            didReceiveResponse({ context, response }) {
              const { res } = context as { res: Response };
              // Cookie set in subgraph is available in response argument
              const cookieHeaderValue = response.http.headers.get('set-cookie');

              // We should expect that no cookies were set
              if (cookieHeaderValue) {
                cookieHeaderValue
                  // Splitting all set cookies by separator if there are multiple
                  // cookies set
                  .split(',')
                  .forEach(cookie => {
                    // Getting cookie name and value
                    const [name, value] = [
                      cookie.slice(0, cookie.indexOf('=')),
                      cookie.slice(cookie.indexOf('=') + 1, cookie.indexOf(';')),
                    ];
                    // Getting additional cookie options
                    const httpOnly = cookie.includes('HttpOnly');
                    const secure = cookie.includes('Secure');
                    const options = {
                      httpOnly,
                      secure,
                    };

                    if (cookie.includes('SameSite')) {
                      const startIndex = cookie.indexOf('SameSite=') + 'SameSite='.length;
                      const endIndex = cookie.indexOf(';', startIndex);

                      options['sameSite'] = cookie.slice(
                        startIndex,
                        endIndex <= 0 ? cookie.length : endIndex,
                      );
                    }

                    // Setting cookie on response to client
                    res.cookie(name, value, options);
                  })
              }

              return response;
            },
            willSendRequest({ request, context }) {
              const { req } = context as { req: Request };
              const cookieHeaderValue = req.header('cookie');

              if (cookieHeaderValue) {
                request.http.headers.set('cookie', cookieHeaderValue);
              }
            }
          })
        }
      }
    })
  ],
})
export class AppModule {}
