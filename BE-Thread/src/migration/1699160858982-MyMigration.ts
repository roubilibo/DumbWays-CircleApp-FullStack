import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1699160858982 implements MigrationInterface {
    name = 'MyMigration1699160858982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers" ("following_id" integer NOT NULL, "follower_id" integer NOT NULL, CONSTRAINT "PK_8fc3b802b0b818a7f4c2b4c30ca" PRIMARY KEY ("following_id", "follower_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_95627c64d9f57814010a003032" ON "followers" ("following_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11d02e2a1197cfb61759da5a8" ON "followers" ("follower_id") `);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_95627c64d9f57814010a003032e" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_95627c64d9f57814010a003032e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e11d02e2a1197cfb61759da5a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_95627c64d9f57814010a003032"`);
        await queryRunner.query(`DROP TABLE "followers"`);
    }

}
