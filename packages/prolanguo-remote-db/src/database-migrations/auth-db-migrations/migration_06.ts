import { Knex } from "knex";
import { TableName } from "../../enums/tableName";

export async function migration_06(tx: Knex.Transaction): Promise<void>{
  await createPurchaseTableIfNotExists(tx);
}

// Table name: prolanguo_purchase (TableName.PURCHASE)
function createPurchaseTableIfNotExists(db: Knex.Transaction): Knex.Raw{
  console.log("CREATING PURCHASE TABLE...")
  return db.raw(`
    CREATE TABLE IF NOT EXISTS ${TableName.PURCHASE} (
      transactionId VARCHAR(191) NOT NULL,
      service VARCHAR(20) NOT NULL,
      productId VARCHAR(191) NOT NULL,
      userId VARCHAR(60) NOT NULL,
      purchaseDate DATETIME NOT NULL,
      quantity INT NOT NULL,
      originalTransactionId VARCHAR(191),
      originalPurchaseDate DATETIME,
      cancellationDate DATETIME,
      expirationDate DATETIME,
      PRIMARY KEY (transactionId, service),
      INDEX (userId),
      FOREIGN KEY (userId) REFERENCES ${TableName.USER}(userId)
    ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `)
}