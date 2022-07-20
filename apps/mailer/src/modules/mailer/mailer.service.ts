import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import type { Options } from "nodemailer/lib/mailer";
import * as hbs from 'nodemailer-express-handlebars';
import { create } from 'express-handlebars';

@Injectable()
export class MailerService {
  private readonly transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'zimnikovvladislav@gmail.com',
        pass: 'zakfrbicypsdkitq',
      }
    });

    this.transporter.use('compile', hbs({
      viewEngine: create({
        layoutsDir: './apps/mailer/src/modules/mailer/views/layouts',
      }),
      viewPath: './apps/mailer/src/modules/mailer/views',
    }));
  }

  async sendEmail(options: Omit<Options, 'from'> & { template?: string; context?: Record<string, unknown> }) {
    const result = await this.transporter.sendMail({
      ...options,
      from: 'zimnikovvladislav@gmail.com',
    });

    return result;
  }
}
