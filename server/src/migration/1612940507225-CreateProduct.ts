import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateProduct1612940507225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'price',
            type: 'integer',
          },
          {
            name: 'title',
            type: 'varchar(255)',
          },
          {
            name: 'desc',
            type: 'text',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
