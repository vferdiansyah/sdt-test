import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { firstValueFrom } from 'rxjs';
import { APP_CONFIG_TOKEN, AppConfig } from '../config';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  addBirthdayCronJob(id: number, timeZone: string) {
    const appConfig = this.configService.get<AppConfig>(APP_CONFIG_TOKEN);
    // const extConfig = this.configService.get<ExtConfig>(EXT_CONFIG_TOKEN);

    const job = new CronJob(
      `* * 9 * * *`,
      () => {
        console.log('start');
        firstValueFrom(
          this.httpService.post(
            `http://${appConfig.host}:${appConfig.port}/messages/birthday`,
            {
              id,
            },
            {
              headers: {
                'Idempotency-Key': id,
              },
            },
          ),
        ).then((response) => {
          console.log(response.data);
          console.log('finish');
        });
      },
      null,
      null,
      timeZone,
    );

    this.schedulerRegistry.addCronJob(`${id}-birthday`, job);
    job.start();
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
