import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1779653314228 implements MigrationInterface {
    name = 'Migration1779653314228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`transactiodId\` \`transactionId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`transactionId\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`transactionId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`transactionId\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`transactionId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`transactionId\` \`transactiodId\` varchar(255) NULL`);
    }

}
