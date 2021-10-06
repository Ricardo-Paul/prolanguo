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
      setName VARCHAR(191) NOT NULL,
      setStatus VARCHAR(60) NOT NULL,
      learningLanguageCode VARCHAR(60) NOT NULL,
      translatedLanguageCode VARCHAR(60) NOT NULL,
      updatedStatusAt DATETIME NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, setId),
      INDEX (userId, lastSyncedAt)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
};

function createSetExtraDataTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.SET_EXTRA_DATA} (
      userId VARCHAR(60) NOT NULL,
      setId VARCHAR(60) NOT NULL,
      dataName VARCHAR(60) NOT NULL,
      dataValue TEXT NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}

function createDefinitionTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.DEFINITION} (
      userId VARCHAR(60) NOT NULL,
      definitionId VARCHAR(60) NOT NULL,
      vocabularyId VARCHAR(60) NOT NULL,
      definitionStatus VARCHAR(60) NOT NULL,
      meaning TEXT NOT NULL,
      wordclasses TEXT NOT NULL,
      source VARCHAR(191) NOT NULL,
      updatedStatusAt DATETIME NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY(definitionId, userId),
      FOREIGN KEY(userId, vocabularyId) REFERENCES ${TableName.VOCABULARY}(userId, vocabularyId)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}

function createVocalaryCategoryTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.VOCABULARY_CATEGORY} (
      userId VARCHAR(60) NOT NULL,
      vocabularyId VARCHAR(60) NOT NULL,
      categoryName VARCHAR(191) NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, vocabularyId),
      FOREIGN KEY (userId, vocabularyId) REFERENCES ${TableName.VOCABULARY}(userId, vocabularyId)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}

function createVocabularyWritingTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.VOCABULARY_WRITING} (
      userId VARCHAR(60) NOT NULL,
      vocabularyId VARCHAR(60) NOT NULL,
      level INT NOT NULL,
      lastWrittenAt DATETIME DEFAULT NULL,
      disabled TINYINT(1) NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, vocabularyId),
      FOREIGN KEY (userId,  vocabularyId) REFERENCES ${TableName.VOCABULARY}
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}

function createLockTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.LOCK} (
      userId VARCHAR(60) NOT NULL,
      lockName VARCHAR(191) NOT NULL,
      PRIMARY KEY (userId, lockName)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}