import knex, { Knex } from "knex";
import { TableName } from "../enums/tableName";


 async function pre_migration(db: Knex.Transaction, dbInfoTableName: string): Promise<void> {
  return db.raw(`
  CREATE TABLE IF NOT EXISTS ${dbInfoTableName} (
    name VARCHAR(60) PRIMARY KEY NOT NULL,
    value VARCHAR(191) NOT NULL
  ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}

export class AuthDatabaseMigrationRunner{

  private authDb: Knex;

  constructor(authDb: Knex){
    this.authDb = authDb
  }

  public async run(){
    console.log('Running Auth Database Migration');
    await this.preMigration();
  }

  private async preMigration(): Promise<void>{
    return new Promise((resolve, reject) => {
      console.log("Premigration: About to create DB table")
      this.authDb.transaction(async tx => {
        await pre_migration(tx, TableName.AUTH_DB_INFO)
      })
    })
  }
  
}