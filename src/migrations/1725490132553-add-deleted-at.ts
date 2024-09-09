import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAt1725490132553 implements MigrationInterface {
    name = 'AddDeletedAt1725490132553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_to_product" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "order_to_product" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "deleted_at"`);
    }

}
