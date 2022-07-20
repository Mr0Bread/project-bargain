import { DynamicModule, Inject, MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { createTrpcExpressMiddleware } from "../../trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ITrpcRouter } from "./interfaces/trpc-router.interface";

export type TrpcModuleOptions = {
  trpcPath: string;
  router: Type<ITrpcRouter>;
  createContext: (options: trpcExpress.CreateExpressContextOptions) => Record<string, unknown>
}

@Module({})
export class TrpcModule implements NestModule {
  private readonly options: TrpcModuleOptions;
  private readonly trpcRouter: ITrpcRouter;

  constructor(
    @Inject('CONFIG_OPTIONS') options: TrpcModuleOptions,
    @Inject('TRPC_ROUTER') trpcRouter: ITrpcRouter,
  ) {
    this.options = options;
    this.trpcRouter = trpcRouter;
  }

  configure(consumer: MiddlewareConsumer): any {
    const {
      trpcPath,
      createContext,
    } = this.options;

    consumer
      .apply(createTrpcExpressMiddleware({
        router: this.trpcRouter.getRouter(),
        createContext
      }))
      .forRoutes(trpcPath);
  }

  static forRoot(options: TrpcModuleOptions): DynamicModule {
    const {
      router,
    } = options;

    return {
      module: TrpcModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        {
          provide: 'TRPC_ROUTER',
          useClass: router,
        }
      ]
    };
  }
}
