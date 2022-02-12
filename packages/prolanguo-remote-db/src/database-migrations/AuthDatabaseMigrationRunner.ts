import { Knex } from "knex";
import * as Joi from "joi";
import { TableName } from "../enums/tableName";
import { migration_01 } from "./auth-db-migrations/migration_01";
import { migration_02 } from "./auth-db-migrations/migration_02";
import { migration_03 } from "./auth-db-migrations/migration_03";
import { migration_04 } from "./auth-db-migrations/migration_04";
import { migration_05 } from "./auth-db-migrations/migration_05";
import { migration_06 } from "./auth-db-migrations/migration_06";
import { pre_migration } from "./pre_migration"

export class AuthDatabaseMigrationRunner {
  private migrations: readonly [number, (tx: Knex.Transaction) => void][] = [
    [1, migration_01],
    [2, migration_02],
    [3, migration_03],
    [4, migration_04],
    [5, migration_05],
    [6, migration_06]
  ];
  private authDb: Knex;

  constructor(authDb: Knex){
    this.authDb = authDb
  }

  public async run(){
    console.log('Running Auth Database Premigration');
    // await this.preMigration();

    const currentVersion = await this.getDatabaseVersion();
    console.log("Current version :", currentVersion, "(AuthDbMigrationRunner)")

    // try to update the version witout running the migration scripts
    for (const [version, migrationScript] of this.migrations){
      if(currentVersion < version){
        await this.authDb.transaction(async (tx): Promise<void> => {
          migrationScript(tx);
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
        const results = await 
          this.authDb
          .select()
          .from(TableName.AUTH_DB_INFO)
          .where('name', 'databaseVersion');
          // or where({name: 'databaseVersion})

          // returns [{name: 'databaseVersion', value: '0'}]

          console.log("Attempting to read database version :", results);
          if(results.length === 0){
            resolve(0)
          }else {
            // coerce databaseVersion to a number with Joi
            const versionNumber = Joi.attempt(results[0].value, Joi.number())
            resolve(
              versionNumber
            );
            console.log("Version Number :", versionNumber);
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
        // if the primary key matches (in our case PK name)
        // this is so the table always has one row
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