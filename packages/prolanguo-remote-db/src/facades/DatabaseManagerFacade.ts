import knex, { Knex } from "knex";
import { ShardDbConfig } from "../interfaces/ShardDbConfig";

export class DatabaseManagerFacade {
  public async databaseExists(config: ShardDbConfig, shardDatabaseNamePrefix: string): Promise<boolean> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try {
          // connecting to mysql
          const db = knex({
            client: 'mysql',
            connection: {
              host: config.host,
              port: config.port,
              user: config.user,
              password: config.password
            }
          });

          // see whether schema_name equals db
          const result = await db
            .select('SCHEMA_NAME')
            .from('INFORMATION_SCHEMA.SCHEMATA')
            .where({ SCHEMA_NAME: shardDatabaseNamePrefix + config.shardId });

          if (result && result.length === 1) {
            resolve(true)
          } else {
            resolve(false)
          }
        } catch (err) {
          reject(err)
        }
      }
    );
  }

  public async createShardDatabaseIfNotExists(config: ShardDbConfig, shardDatabaseNamePrefix: string): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const db = knex({
            client: 'mysql',
            connection: {
              host: config.host,
              port: config.port,
              user: config.user,
              password: config.password
            }
          })

          await db.transaction((tx): Knex.Raw => {
            return tx.raw(
              `CREATE DATABASE IF NOT EXISTS ${shardDatabaseNamePrefix}${config.shardId}`
            );
          });
          await db.destroy();
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }
}