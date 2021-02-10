import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreatePayment1612946618734 implements MigrationInterface {
  name = 'CreatePayment1612946618734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "payment" ADD "created_at" TIMESTAMP NOT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE "payment" ADD "updated_at" TIMESTAMP NOT NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "payment" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "payment" DROP COLUMN "created_at"');
  }
}
