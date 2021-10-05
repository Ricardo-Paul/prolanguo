import { Knex } from "knex";

export async function pre_migration(db: Knex.Transaction, dbInfoTableName: string): Promise<void> {
  return db.raw(`
  CREATE TABLE IF NOT EXISTS ${dbInfoTableName} (
    name VARCHAR(60) PRIMARY KEY NOT NULL,
    value VARCHAR(191) NOT NULL
  ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}