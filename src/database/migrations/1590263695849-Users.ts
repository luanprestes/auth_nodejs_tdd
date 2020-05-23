import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Users1590263695849 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'password_hash',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: false
        }
      ]
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
