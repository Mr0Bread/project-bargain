/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DatabaseService } from "@modules/database/database.service";

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4002;
  const host = process.env.HOST || 'localhost';

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app)

  await app.listen(port, host);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}`
  );
}

bootstrap();
