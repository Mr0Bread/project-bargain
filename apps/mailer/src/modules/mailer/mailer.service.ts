import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import type { Options } from "nodemailer/lib/mailer";

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
    })
  }

  async sendEmail(options: Omit<Options, 'from'>) {
    const result = await this.transporter.sendMail({
      ...options,
      from: 'zimnikovvladislav@gmail.com',
    });

    return result;
  }
}
