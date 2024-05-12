import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/core/entity/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  location: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  timezone: string;
}
