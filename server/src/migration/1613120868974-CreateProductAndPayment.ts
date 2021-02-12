import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductAndPayment1613120868974 implements MigrationInterface {
    name = 'CreateProductAndPayment1613120868974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "mnemonic" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "valid_until" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP NOT NULL, "productId" integer, CONSTRAINT "REL_f921b37b5533ad3ef0440366da" UNIQUE ("productId"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f921b37b5533ad3ef0440366dab" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f921b37b5533ad3ef0440366dab"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
