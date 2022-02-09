import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

export async function migration_01(tx: Knex.Transaction): Promise<void> {
  await createUserTableIfNotExists(tx);
  await createRequestPasswordResetTableIfNotExists(tx);
}

// Table name: prolanguo_user (TableName.USER)
function createUserTableIfNotExists(db: Knex.Transaction): Knex.Raw {
  console.log(`Creating table: prolanguo_user (migration_01)`)

  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.USER} (
      userId VARCHAR(60) PRIMARY KEY NOT NULL,
      shardId INT NOT NULL,
      email VARCHAR(191) NOT NULL,
      password VARCHAR(191) NOT NULL,
      accessKey VARCHAR(191) NOT NULL,
      userStatus VARCHAR(60) NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE(email)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}

// Table name: prolanguo_reset_password_request (TableName.RESET_PASSWORD_REQUEST)
function createRequestPasswordResetTableIfNotExists(db: Knex.Transaction): Knex.Raw {
  console.log(`Creating table: prolanguo_reset_password_request (migration_02)`)

  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.RESET_PASSWORD_REQUEST} (
      userId VARCHAR(60) PRIMARY KEY NOT NULL,
      resetPasswordKey VARCHAR(191) NOT NULL,
      expiredAt DATETIME NOT NULL,
      FOREIGN KEY (userId) REFERENCES ${TableName.USER}(userId)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}
