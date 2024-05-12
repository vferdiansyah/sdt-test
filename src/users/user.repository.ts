import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import {
  BaseRepository,
  WhereCondition,
} from '../common/core/repository/base.repository';
import { User } from './user.entity';
import { UserRepositoryInterface } from './user.interface';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';

export class UserRepository
  extends BaseRepository<User, DeepPartial<User>>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @InjectEntityManager() protected readonly entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }

  protected prepareQuery(params: DeepPartial<User>): WhereCondition<User> {
    const where: WhereCondition<User> = {};
    return where;
  }
}
