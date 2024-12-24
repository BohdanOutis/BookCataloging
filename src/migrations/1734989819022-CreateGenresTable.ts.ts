import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenresTable1734989819022 implements MigrationInterface {
    name = 'CreateGenresTable1734989819022';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres_books_books" ("genresId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_d90e3af2af49b849b5f9d27cfe6" PRIMARY KEY ("genresId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_666784d017b4942ef95db84ae5" ON "genres_books_books" ("genresId")`);
        await queryRunner.query(`CREATE INDEX "IDX_9174c3b28c946aaa7b1bf04c30" ON "genres_books_books" ("booksId")`);
        await queryRunner.query(`ALTER TABLE "genres_books_books" ADD CONSTRAINT "FK_666784d017b4942ef95db84ae51" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genres_books_books" ADD CONSTRAINT "FK_9174c3b28c946aaa7b1bf04c30b" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres_books_books" DROP CONSTRAINT "FK_9174c3b28c946aaa7b1bf04c30b"`);
        await queryRunner.query(`ALTER TABLE "genres_books_books" DROP CONSTRAINT "FK_666784d017b4942ef95db84ae51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9174c3b28c946aaa7b1bf04c30"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_666784d017b4942ef95db84ae5"`);
        await queryRunner.query(`DROP TABLE "genres_books_books"`);
    }
}
