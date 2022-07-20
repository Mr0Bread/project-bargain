import { Injectable } from "@nestjs/common";
import { ITrpcRouter } from "@modules/trpc/interfaces/trpc-router.interface";
import * as trpc from "@trpc/server";
import * as zod from 'zod';
import { MailerService } from "@modules/mailer/mailer.service";

const sendInputSchema = zod.object({
  to: zod.string().array().nonempty('At least one recipient is required'),
  subject: zod.string().min(1, 'Subject is required'),
  cc: zod.string().array().nullish(),
  bcc: zod.string().array().nullish(),
  text: zod.string().nullish(),
  html: zod.string().nullish(),
  template: zod.string().nullish(),
  context: zod.record(zod.any()).nullish()
});

@Injectable()
export class TrpcRouter implements ITrpcRouter {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  getRouter() {
    return trpc
      .router()
      .query('hello', {
        resolve: async () => {
          return {
            message: 'Hello World',
          };
        },
      })
      .query('send', {
        input: sendInputSchema,
        resolve: async ({
          input,
                        }) => {
          const {
            text,
            to,
            subject,
            cc,
            bcc,
            html,
          } = input;

          await this.mailerService.sendEmail({
            text: text || undefined,
            to: to.join(', '),
            subject,
            cc: cc?.join(', '),
            bcc: bcc?.join(', '),
            html: html || undefined,
          });

          return {
            isSuccess: true,
          };
        }
      })
  }
}

export type AppRouter = ReturnType<typeof TrpcRouter['prototype']['getRouter']>
