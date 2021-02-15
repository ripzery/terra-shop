import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateProductAndPayment1613200102005
  implements MigrationInterface {
  name = 'CreateProductAndPayment1613200102005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "mnemonic" character varying NOT NULL, "amount" integer NOT NULL, "completed" boolean NOT NULL DEFAULT false, "buyerEmail" character varying NOT NULL, "productId" integer NOT NULL, "validUntil" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "product" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "product"');
    await queryRunner.query('DROP TABLE "payment"');
  }
}
