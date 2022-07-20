import { AnyRouter } from "@trpc/server";

export interface ITrpcRouter {
  getRouter: () => AnyRouter;
}
