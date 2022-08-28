/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { DatabaseService } from "@modules/database/database.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4001;
  const host = process.env.HOST || 'localhost';

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app)

  app.use(cookieParser());

  await app.listen(port, host);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}`
  );
}

bootstrap();
