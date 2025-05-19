import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747622640619 implements MigrationInterface {
    name = 'Migration1747622640619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seller" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_77c163b307cb8d769d6f4bda717" UNIQUE ("name"), CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transcription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transcription" character varying, "business_line" character varying, "daily_consultations" character varying, "business_stage" character varying, "how_came_to_vambe" character varying, "problem" character varying, "reasons" character varying, "expectations" character varying, CONSTRAINT "PK_3764fac21d004a4657b455f2b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "closed" boolean NOT NULL, "transcriptionId" uuid, "clientId" uuid, "sellerId" uuid, CONSTRAINT "REL_c38b6aec7acba5b7f0d50e9b79" UNIQUE ("transcriptionId"), CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meeting" ADD CONSTRAINT "FK_c38b6aec7acba5b7f0d50e9b792" FOREIGN KEY ("transcriptionId") REFERENCES "transcription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting" ADD CONSTRAINT "FK_7cc034bc0e75e5e6c88ed332a52" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting" ADD CONSTRAINT "FK_1db0f5a8b90480f29cc8f365d36" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting" DROP CONSTRAINT "FK_1db0f5a8b90480f29cc8f365d36"`);
        await queryRunner.query(`ALTER TABLE "meeting" DROP CONSTRAINT "FK_7cc034bc0e75e5e6c88ed332a52"`);
        await queryRunner.query(`ALTER TABLE "meeting" DROP CONSTRAINT "FK_c38b6aec7acba5b7f0d50e9b792"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`DROP TABLE "transcription"`);
        await queryRunner.query(`DROP TABLE "seller"`);
    }

}
