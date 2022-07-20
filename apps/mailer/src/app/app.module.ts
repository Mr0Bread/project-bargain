import { Module } from '@nestjs/common';
import { TrpcModule } from "@modules/trpc/trpc.module";
import { createContext } from "../trpc";
import { TrpcRouter } from "./trpc.router";

@Module({
  imports: [
    TrpcModule.forRoot({
      trpcPath: process.env.TRPC_PATH || '/trpc',
      router: TrpcRouter,
      createContext: createContext
    }),
  ],
})
export class AppModule {}
