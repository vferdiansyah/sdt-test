import { IsDate, IsEmail, IsTimeZone } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/core/entity/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

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
  @IsDate()
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
  @IsTimeZone()
  timezone: string;
}
