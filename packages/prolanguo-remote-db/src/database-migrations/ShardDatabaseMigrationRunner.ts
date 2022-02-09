import { Knex } from "knex";
import { TableName } from "../enums/tableName";
import { migration_01 } from "./shard-db-migrations/migration_01";
import { migration_02 } from "./shard-db-migrations/migration_02";
import * as _ from "lodash";
import * as Joi from "joi";

import { pre_migration } from "./pre_migration";

export class ShardDatabaseMigrationRunner{
  private migrations: readonly[number, (tx: Knex.Transaction) => void][] = [
    [1, migration_01],
    [2, migration_02]
  ]
  
  private shardDb: Knex;
  constructor(shardDb: Knex){
    this.shardDb = shardDb
  };

  public async run(): Promise<void>{
    await this.preMigration();
    const databaseVersion = await this.getDatabaseVersion();
    for(const [version, migration] of this.migrations){
      console.log(`databaseVersion: ${databaseVersion}, migrationVersion: ${version}`);
      if(databaseVersion < version){
        this.shardDb.transaction(async (tx) => {
          migration(tx);
          await this.updateDatabaseVersion(tx, version);
        })
      }
    }
  }

  private async preMigration(): Promise<void>{
    this.shardDb.transaction(async (tx) => {
      await pre_migration(tx, TableName.SHARD_DB_INFO)
    })
  }

  private getDatabaseVersion(): Promise<number> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await this.shardDb.select().from(TableName.SHARD_DB_INFO).where({name: 'databaseVersion'});
          // return type [[name: 'databaseVersion', value: 0]]
          if(result.length === 0){
            resolve(0)
          }else {
            let versionNumber = Joi.attempt(_.first(result).value, Joi.number());
            resolve(versionNumber);
          }
        }catch(error){
          reject(error)
        }
      }
    );
  };

  private updateDatabaseVersion(db: Knex.Transaction, version: number): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const query = db.insert({
            name: 'databaseVersion',
            value: version
          }).into(TableName.SHARD_DB_INFO)
          .toSQL();

          const { sql, bindings } = query;
          const replaceSQL = sql.replace('insert', 'replace');
          await db.raw(replaceSQL, bindings); //replace db version number
          resolve();
        }catch(error){
          reject(error)
        }
      }
    );
  }
};