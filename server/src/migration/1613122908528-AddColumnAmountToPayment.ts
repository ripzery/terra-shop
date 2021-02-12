import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnAmountToPayment1613122908528 implements MigrationInterface {
    name = 'AddColumnAmountToPayment1613122908528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
    }

}
