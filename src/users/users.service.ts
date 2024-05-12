import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY_TOKEN, UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async create(body: DeepPartial<User>): Promise<User> {
    try {
      const user = this.userRepository.create(body);
      return this.userRepository.save(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}
