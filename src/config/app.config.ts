import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  host: string;
  env: string;
}

export const APP_CONFIG_TOKEN = 'app';

export const appConfig = registerAs<AppConfig>(
  APP_CONFIG_TOKEN,
  (): AppConfig => ({
    port: parseInt(process.env.APP_PORT, 10),
    host: process.env.APP_HOST,
    env: process.env.NODE_ENV,
  }),
);
