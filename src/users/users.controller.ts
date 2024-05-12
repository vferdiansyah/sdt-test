import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BaseResponse } from '../common/core/response/base.response';
import { ResponseMessage } from '../shared/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<BaseResponse> {
    try {
      await this.usersService.create(createUserDto);
      return new BaseResponse(HttpStatus.CREATED, ResponseMessage.USER.CREATED);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
