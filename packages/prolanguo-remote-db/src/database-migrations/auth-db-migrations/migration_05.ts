import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

export async function migration_05(tx: Knex.Transaction): Promise<void> {
  await createApiKeyTableIfNotExists(tx);
}

// Table name: prolanguo_api_key (TableName.API_KEY)
function createApiKeyTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.API_KEY} (
      apiKey VARCHAR(191) PRIMARY KEY NOT NULL,
      apiScope VARCHAR(60) NOT NULL,
      userId VARCHAR(60) NOT NULL,
      expiredAt DATETIME,
      INDEX (userId),
      FOREIGN KEY (userId) REFERENCES ${TableName.USER}(userId)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}