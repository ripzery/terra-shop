import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveRelation1613122715797 implements MigrationInterface {
    name = 'RemoveRelation1613122715797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f921b37b5533ad3ef0440366dab"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "payment"."productId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "REL_f921b37b5533ad3ef0440366da"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "REL_f921b37b5533ad3ef0440366da" UNIQUE ("productId")`);
        await queryRunner.query(`COMMENT ON COLUMN "payment"."productId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f921b37b5533ad3ef0440366dab" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
