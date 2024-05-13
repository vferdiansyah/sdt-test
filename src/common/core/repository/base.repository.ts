import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  QueryFailedError,
  QueryRunner,
  Repository,
} from 'typeorm';
import { ErrorMessage } from '../../../shared/constants';
import { BaseRepositoryInterface } from '../interface/base.interface';

export type WhereCondition<T> = FindOptionsWhere<T>[] | FindOptionsWhere<T>;

export abstract class BaseRepository<T extends ObjectLiteral, QueryParams>
  implements BaseRepositoryInterface<T>
{
  protected constructor(
    protected readonly repository: Repository<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  protected abstract prepareQuery(params: QueryParams): WhereCondition<T>;

  protected async createQueryRunner(): Promise<QueryRunner> {
    return this.entityManager.connection.createQueryRunner();
  }

  async save(data: DeepPartial<T>): Promise<T> {
    const queryRunner = await this.createQueryRunner();
    await queryRunner.connect();

    try {
      if (queryRunner.isTransactionActive) {
        return await this.repository.save(data);
      }

      await queryRunner.startTransaction();
      const result = await this.repository.save(data);
      await queryRunner.commitTransaction();

      return result;
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();
      if (err instanceof QueryFailedError) {
        throw new Error(ErrorMessage.DB.FAILED);
      }
    } finally {
      await queryRunner.release();
    }
  }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return await this.repository.findOneBy(options);
  }

  async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne(filterCondition);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async update(id: any, data: Partial<T>): Promise<T> {
    const queryRunner = await this.createQueryRunner();
    await queryRunner.connect();

    try {
      if (queryRunner.isTransactionActive) {
        await this.repository.update(id, data);
        return await this.repository.findOneBy({ id });
      }

      await queryRunner.startTransaction();
      await this.repository.update(id, data);
      await queryRunner.commitTransaction();

      return await this.repository.findOneBy({ id });
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();
      if (err instanceof QueryFailedError) {
        throw new Error(ErrorMessage.DB.FAILED);
      }
    } finally {
      await queryRunner.release();
    }
  }

  async delete(data: T): Promise<T> {
    const queryRunner = await this.createQueryRunner();
    await queryRunner.connect();

    try {
      if (queryRunner.isTransactionActive) {
        (data as any).deletedAt = new Date();
        return await this.repository.save(data);
      }

      await queryRunner.startTransaction();
      (data as any).deletedAt = new Date();
      const result = await this.repository.save(data);
      await queryRunner.commitTransaction();

      return result;
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();
      if (err instanceof QueryFailedError) {
        throw new Error(ErrorMessage.DB.FAILED);
      }
    } finally {
      await queryRunner.release();
    }
  }
}
