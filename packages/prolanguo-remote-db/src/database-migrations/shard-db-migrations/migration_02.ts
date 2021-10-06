import { Knex } from "knex";
import { TableName } from "../../enums/tableName";


export async function migration_02(tx: Knex.Transaction){
  await createLessonResultTableIfNotExists(tx);
}

function createLessonResultTableIfNotExists(db: Knex.Transaction){
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.LESSON_RESULT} (
      userId VARCHAR(60) NOT NULL,
      lessonResultId VARCHAR(60) NOT NULL,
      lessonType VARCHAR(191) NOT NULL,
      setId VARCHAR(60) NOT NULL,
      
      poorCount SMALLINT UNSIGNED NOT NULL,
      fairCount SMALLINT UNSIGNED NOT NULL,
      goodCount SMALLINT UNSIGNED NOT NULL,
      greatCount SMALLINT UNSIGNED NOT NULL,
      superbCount SMALLINT UNSIGNED NOT NULL,
      totalCount SMALLINT UNSIGNED NOT NULL,
      
      createdAt DATETIME NOT NULL,
      PRIMARY KEY (userId, lessonResultId),
      INDEX (userId, createdAt)
    )ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
} 