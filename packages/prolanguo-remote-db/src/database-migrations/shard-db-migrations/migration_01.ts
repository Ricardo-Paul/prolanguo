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
      userId VARCHAR(60) NOT NULL,
      setId VARCHAR(60) NOT NULL,
      setName VARACHAR(191) NOT NULL,
      setStatus VARACHAR(60) NOT NULL,
      learningLanguageCode VARCHAR(60) NOT NULL,
      translatedLanguageCode VARACHAR(60) NOT NULL,
      updatedStatusAt DATETIME NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, setId),
      INDEX (userId, lastSyncedAt)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
};

function createSetExtraDataTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.SET_EXTRA_DATA} (
      userId VARCHAR(60) NOT NULL,
      setId VARCAHR(60) NOT NULL,
      dataName VARCHAR(60) NOT NULL,
      dataValue TEXT NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, setId, dataName),
      FOREIGN KEY (userId, setId) REFERENCES ${TableName.SET}(userId, setId),
      INDEX(userId, lastSyncedAt)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}

function createVocabularyTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.VOCABULARY} (
      userId VARCHAR(60) NOT NULL,
      vocabularyId VARCHAR(60) NOT NULL,
      setId VARCHAR(60) NOT NULL,

      vocabularyText TEXT NOT NULL,
      vocabularyStatus VARCHAR(60) NOT NULL,
      level INT NOT NULL,
      lastLearnedAt DATETIME NOT NULL,

      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      PRIMARY KEY(userId, vocabularyId),
      FOREIGN KEY(userId, setId) REFERENCES ${TableName.SET}(userId, setId)
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