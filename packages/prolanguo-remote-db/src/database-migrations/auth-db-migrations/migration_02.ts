import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

export async function migration_02(tx: Knex.Transaction): Promise<void>{
  await addSyncedAtColumnsToUserTable(tx);
}

function addSyncedAtColumnsToUserTable(db: Knex.Transaction): Knex.Raw {
  console.log(`Adding syncedAt columns to prolanguo_user table (migration_02)`)
  return db.raw(`
    ALTER TABLE ${TableName.USER}
    ADD firstSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD lastSyncedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  `)
}