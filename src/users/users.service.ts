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

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  async update(id: number, body: Partial<User>): Promise<User> {
    try {
      return this.userRepository.update(id, body);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneById(id);
      if (!user) {
        return null;
      }
      return await this.userRepository.delete(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}
