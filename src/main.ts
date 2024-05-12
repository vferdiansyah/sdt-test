import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { APP_CONFIG_TOKEN, AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const appConfig = configService.get<AppConfig>(APP_CONFIG_TOKEN);
  if (!appConfig) {
    throw new Error('App config is not found.');
  }

  app.useGlobalPipes(new ValidationPipe());

  const { env, host, port } = appConfig;

  await app.listen(port, () =>
    console.debug(`API server ${env} is listening at http://${host}:${port}`),
  );
}
bootstrap();
