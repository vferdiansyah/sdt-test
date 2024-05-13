import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1715359754143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersTable = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          generationStrategy: 'identity',
          generatedIdentity: 'ALWAYS',
          isPrimary: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'firstName',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'lastName',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'dateOfBirth',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'location',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'timezone',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    });
    await queryRunner.createTable(usersTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
