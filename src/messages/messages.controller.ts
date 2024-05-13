import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Idempotent } from '@node-idempotency/nestjs';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '../common/core/response/base.response';
import { EXT_CONFIG_TOKEN, ExtConfig } from '../config';
import { ResponseMessage } from '../shared/constants';
import { UsersService } from '../users/users.service';
import { BirthdayMessage } from './birthday.message';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Idempotent()
  @Post('birthday')
  async sendBirthdayMessage(@Body() { id }: SendMessageDto) {
    const extConfig = this.configService.get<ExtConfig>(EXT_CONFIG_TOKEN);

    const user = await this.usersService.findOneById(id);
    if (!user) {
      return new BaseResponse(
        HttpStatus.NOT_FOUND,
        ResponseMessage.USER.NOT_FOUND,
      );
    }

    const message = new BirthdayMessage(
      user.firstName,
      user.lastName,
    ).generateMessage();

    const response = await firstValueFrom(
      this.httpService.post(`${extConfig.baseApiUrl}/send-email`, {
        email: user.email,
        message,
      }),
    );
    return response.data;
  }
}
