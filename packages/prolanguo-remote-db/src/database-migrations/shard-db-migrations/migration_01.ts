import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

export async function migration_01(tx: Knex.Transaction){
  await createSetTableIfNotExists(tx);
  await createSetExtraDataTableIfNotExists(tx);
  await createVocabularyTableIfNotExists(tx);
  await createDefinitionTableIfNotExists(tx);
  await createVocalaryCategoryTableIfNotExists(tx);
  await createVocabularyWritingTableIfNotExists(tx);
  await createLockTableIfNotExists(tx);
}

function createSetTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.SET} (

    )
  `)
};

function createSetExtraDataTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.SET_EXTRA_DATA} (

    )
  `)
}

function createVocabularyTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.VOCABULARY} (

    )
  `)
}

function createDefinitionTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.DEFINITION} (

    )
  `)
}

function createVocalaryCategoryTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.VOCABULARY_CATEGORY} (

    )
  `)
}

function createVocabularyWritingTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.VOCABULARY_WRITING} (

    )
  `)
}

function createLockTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.LOCK} (

    )
  `)
}