import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Idempotent } from '@node-idempotency/nestjs';
import { BaseResponse } from '../common/core/response/base.response';
import { SchedulerService } from '../scheduler/scheduler.service';
import { ResponseMessage } from '../shared/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly usersService: UsersService,
  ) {}

  @Idempotent()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<BaseResponse> {
    try {
      const user = await this.usersService.create(createUserDto);
      this.schedulerService.addBirthdayCronJob(user.id, user.timezone);
      return new BaseResponse(HttpStatus.CREATED, ResponseMessage.USER.CREATED);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Idempotent()
  @HttpCode(HttpStatus.ACCEPTED)
  @Put()
  async update(@Body() { id, ...body }: UpdateUserDto): Promise<BaseResponse> {
    try {
      await this.usersService.update(id, body);
      return new BaseResponse(
        HttpStatus.ACCEPTED,
        ResponseMessage.USER.UPDATED,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Idempotent()
  @Delete()
  async delete(@Body() { id }: DeleteUserDto): Promise<BaseResponse> {
    try {
      const user = await this.usersService.delete(id);
      if (!user) {
        return new BaseResponse(
          HttpStatus.NOT_FOUND,
          ResponseMessage.USER.NOT_FOUND,
        );
      }
      return new BaseResponse(HttpStatus.OK, ResponseMessage.USER.DELETED);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
