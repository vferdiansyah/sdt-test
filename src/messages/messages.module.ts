import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axiosRetry from 'axios-retry';
import { AxiosRetryModule } from 'nestjs-axios-retry';
import { UsersModule } from '../users/users.module';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    AxiosRetryModule.forRoot({
      axiosRetryConfig: {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        shouldResetTimeout: true,
        retryCondition: (error) => error.status >= 500,
      },
    }),
    ConfigModule,
    UsersModule,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
