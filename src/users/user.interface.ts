import { BaseRepositoryInterface } from '../common/core/interface/base.interface';
import { User } from './user.entity';

export interface UserRepositoryInterface
  extends BaseRepositoryInterface<User> {}
