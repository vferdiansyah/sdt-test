import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(data: DeepPartial<T>): T;
  save(data: DeepPartial<T>): Promise<T>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  findOneById(id: number): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(data: T): Promise<T>;
}
