import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                req,
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                res,
                              }: trpcExpress.CreateExpressContextOptions) => ({}) // no context
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
