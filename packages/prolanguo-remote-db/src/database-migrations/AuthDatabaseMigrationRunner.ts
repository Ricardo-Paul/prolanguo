import knex, { Knex } from "knex";
import { TableName } from "../enums/tableName";
import { migration_01 } from "./auth-db-migrations/migration_01";
import { migration_02 } from "./auth-db-migrations/migration_02";
import { migration_03 } from "./auth-db-migrations/migration_03";

 async function pre_migration(db: Knex.Transaction, dbInfoTableName: string): Promise<void> {
  return db.raw(`
  CREATE TABLE IF NOT EXISTS ${dbInfoTableName} (
    name VARCHAR(60) PRIMARY KEY NOT NULL,
    value VARCHAR(191) NOT NULL
  ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}

export class AuthDatabaseMigrationRunner {
  private migrations: readonly [number, (tx: Knex.Transaction) => void][] = [
    [1, migration_01],
    // [2, migration_02],
    // [3, migration_03]
  ];
  private authDb: Knex;

  constructor(authDb: Knex){
    this.authDb = authDb
  }

  public async run(){
    console.log('Running Auth Database Premigration');
    await this.preMigration();
    
    const currentVersion = await this.getDatabaseVersion();
    console.log("Current version :", currentVersion, "(AuthDbMigrationRunner)")

    // try to update the version witout running the migration scripts
    for (const [version, migrationScript] of this.migrations){
      if(currentVersion < version){
        await this.authDb.transaction(async (tx): Promise<void> => {
          await migrationScript(tx)
          await this.updateDatabaseVersion(tx, version)
          // update the db for each migration run
          // the last version number will be the db version
        })
      }
    };
  }

  private getDatabaseVersion(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try{
        const results = await this.authDb
        // select all columns from prolanguo_auth_db_info
          .select()
          .from(TableName.AUTH_DB_INFO)
          .where('name', 'databaseVersion');

          console.log("Attempting to read database version :", results);
          if(results.length === 0){
            resolve(0)
          }else {
            // return the db version stored in the value column/field
          }

      }catch(err){
        reject(err)
      }
    })
  }

  private updateDatabaseVersion(db: Knex.Transaction, databaseVersion: number): Promise<void> {
    console.log(`About to update prolanguo_auth database version (AuthDbMigrationRunner)`)
    return new Promise(async (resolve, reject) => {
      try{
        const res = db.insert({
          name: 'databaseVersion',
          value: databaseVersion.toString()
        }).into(TableName.AUTH_DB_INFO)
        .toSQL();

        const { sql, bindings } = res;
        // REPLACE is like UPDATE but it will first remove the whole row
        // if the primary key matches (in our case: name)
        const REPLACE_ROW = sql.replace('insert', 'replace');
        await db.raw(REPLACE_ROW, bindings).then(
          () => console.log("AuthDb version updated")
        );

        resolve();
      }catch(err){
        reject(err)
      }
    })
  }

  private async preMigration(): Promise<void> {
    console.log("Premigration: About to create AuthDB info table if not exists");
    this.authDb.transaction(async tx => {
      await pre_migration(tx, TableName.AUTH_DB_INFO);
    })
  };
};