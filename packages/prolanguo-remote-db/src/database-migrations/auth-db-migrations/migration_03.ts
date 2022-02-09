import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

export async function migration_03(tx: Knex.Transaction): Promise<void>{
  await createUserExtraDataTableIfNotexists(tx);
}

// Table name: prolanguo_user_extra_data (TableName.USER_EXTRA_DATA)
function createUserExtraDataTableIfNotexists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.USER_EXTRA_DATA} (
      userId VARCHAR(60) NOT NULL,
      dataName VARCHAR(60) NOT NULL,
      dataValue TEXT NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, dataName),
      FOREIGN KEY (userId) REFERENCES ${TableName.USER}(userId)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}