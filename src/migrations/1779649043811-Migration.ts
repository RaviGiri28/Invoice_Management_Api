import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1779649043811 implements MigrationInterface {
    name = 'Migration1779649043811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice_items\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` DROP COLUMN \`productName\``);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` ADD \`unitPrice\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` ADD \`taxAmount\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` CHANGE \`total\` \`total\` decimal(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice_items\` CHANGE \`total\` \`total\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` DROP COLUMN \`taxAmount\``);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` DROP COLUMN \`unitPrice\``);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` ADD \`productName\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` ADD \`price\` decimal NOT NULL`);
    }

}
