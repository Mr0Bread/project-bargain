import { Injectable } from "@nestjs/common";
import { ITrpcRouter } from "@modules/trpc/interfaces/trpc-router.interface";
import * as trpc from "@trpc/server";

@Injectable()
export class TrpcRouter implements ITrpcRouter {
  getRouter() {
    return trpc
      .router()
      .query('hello', {
        resolve: async () => {
          return {
            message: 'Hello World',
          };
        },
      });
  }
}

export type AppRouter = ReturnType<typeof TrpcRouter['prototype']['getRouter']>
