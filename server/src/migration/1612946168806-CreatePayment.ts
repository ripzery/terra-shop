import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreatePayment1612946168806 implements MigrationInterface {
  name = 'CreatePayment1612946168806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "completed" boolean NOT NULL, "valid_until" TIMESTAMP NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "payment"');
  }
}
