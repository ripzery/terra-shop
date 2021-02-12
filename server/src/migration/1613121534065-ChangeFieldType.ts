import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFieldType1613121534065 implements MigrationInterface {
    name = 'ChangeFieldType1613121534065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "payment"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "payment"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "payment"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "created_at" SET DEFAULT '2021-02-12 09:15:48.809925'`);
        await queryRunner.query(`COMMENT ON COLUMN "payment"."created_at" IS NULL`);
    }

}
