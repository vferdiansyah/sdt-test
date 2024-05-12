// Need to explicitly import dotenv lib so that TypeORM CLI picks up environment
// variable in .env file
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const TYPEORM_CONFIG_TOKEN = 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production' && true,
};

export const typeOrmConfig = registerAs<TypeOrmModuleOptions>(
  TYPEORM_CONFIG_TOKEN,
  (): TypeOrmModuleOptions => config,
);

// Need to explicitly default export config for TypeORM CLI migration
export default new DataSource(config);

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const typeOrmConfig =
      this.configService.get<TypeOrmModuleOptions>(TYPEORM_CONFIG_TOKEN);
    if (!typeOrmConfig) {
      throw new Error('TypeORM config is not found.');
    }

    return {
      ...typeOrmConfig,
    };
  }
}
