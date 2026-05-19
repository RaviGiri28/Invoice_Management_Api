import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1779045798082 implements MigrationInterface {
    name = 'Migration1779045798082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` text NULL, \`price\` decimal(10,2) NOT NULL, \`taxRate\` decimal(5,2) NOT NULL DEFAULT '0.00', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productName\` varchar(100) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`taxRate\` decimal(5,2) NOT NULL DEFAULT '0.00', \`quantity\` int NOT NULL, \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`invoiceId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(10,2) NOT NULL, \`paymentMethod\` enum ('cash', 'bank_transfer', 'credit_card', 'upi') NOT NULL, \`transactiodId\` varchar(255) NULL, \`notes\` text NULL, \`paidAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`invoiceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`invoiceNumber\` varchar(255) NOT NULL, \`status\` enum ('draft', 'sent', 'paid', 'cancelled') NOT NULL DEFAULT 'draft', \`subtotal\` decimal(10,2) NOT NULL DEFAULT '0.00', \`taxAmount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`discount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`notes\` text NULL, \`dueDate\` date NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerid\` int NULL, \`userid\` int NULL, UNIQUE INDEX \`IDX_bf8e0f9dd4558ef209ec111782\` (\`invoiceNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8536b8b85c06969f84f0c098b0\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` ADD CONSTRAINT \`FK_7fb6895fc8fad9f5200e91abb59\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` ADD CONSTRAINT \`FK_7bec360ed9928668b73dac2ec17\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_43d19956aeab008b49e0804c145\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_8671df969df11782584830d308c\` FOREIGN KEY (\`customerid\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoices\` ADD CONSTRAINT \`FK_adcc75f2951e7666bc77fa7a7ee\` FOREIGN KEY (\`userid\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_adcc75f2951e7666bc77fa7a7ee\``);
        await queryRunner.query(`ALTER TABLE \`invoices\` DROP FOREIGN KEY \`FK_8671df969df11782584830d308c\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_43d19956aeab008b49e0804c145\``);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` DROP FOREIGN KEY \`FK_7bec360ed9928668b73dac2ec17\``);
        await queryRunner.query(`ALTER TABLE \`invoice_items\` DROP FOREIGN KEY \`FK_7fb6895fc8fad9f5200e91abb59\``);
        await queryRunner.query(`DROP INDEX \`IDX_8536b8b85c06969f84f0c098b0\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf8e0f9dd4558ef209ec111782\` ON \`invoices\``);
        await queryRunner.query(`DROP TABLE \`invoices\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP TABLE \`invoice_items\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
