import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  NodeIdempotencyModule,
  StorageAdapterEnum,
} from '@node-idempotency/nestjs';
import {
  appConfig,
  extConfig,
  typeOrmConfig,
  TypeOrmConfigService,
} from './config';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, extConfig, typeOrmConfig],
    }),
    NodeIdempotencyModule.forRootAsync({
      storage: {
        adapter: StorageAdapterEnum.memory,
      },
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MessagesModule,
    UsersModule,
  ],
})
export class AppModule {}
