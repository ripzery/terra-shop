import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePayment1612968733472 implements MigrationInterface {
    name = 'CreatePayment1612968733472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "privateKey" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "privateKey"`);
    }

}
