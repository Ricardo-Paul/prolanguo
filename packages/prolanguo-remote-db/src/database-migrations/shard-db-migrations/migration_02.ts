import { Knex } from "knex";
import { TableName } from "../../enums/tableName";


export async function migration_02(tx: Knex.Transaction){
  await createLessonResultTableIfNotExists(tx);
}

function createLessonResultTableIfNotExists(db: Knex.Transaction){
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.LESSON_RESULT} (

    )
  `)
} 