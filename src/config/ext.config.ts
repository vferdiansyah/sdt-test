import { registerAs } from '@nestjs/config';

export interface ExtConfig {
  baseApiUrl: string;
}

export const EXT_CONFIG_TOKEN = 'ext';

export const extConfig = registerAs<ExtConfig>(
  EXT_CONFIG_TOKEN,
  (): ExtConfig => ({
    baseApiUrl: process.env.BASE_API_URL,
  }),
);
