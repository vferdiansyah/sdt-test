import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<BaseResponse> {
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
