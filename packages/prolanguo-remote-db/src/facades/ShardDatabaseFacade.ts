import knex, { Knex } from "knex";
import * as _ from "lodash";
import { ShardDatabaseMigrationRunner } from "../database-migrations/ShardDatabaseMigrationRunner";
import { ShardDbConfig } from "../interfaces/ShardDbConfig";

export class ShardDatabaseFacade {
  private allShardDbConfig: ShardDbConfig[];
  private shardDatabaseNamePrefix: string;
  private shardedDbs: Readonly<{ [p in number]: Knex }>;

  constructor(allShardDbConfig: ShardDbConfig[], shardDatabasePrefixName: string){
    this.allShardDbConfig = allShardDbConfig;
    this.shardDatabaseNamePrefix = shardDatabasePrefixName

    // create a database with each shardDb config
    const connections = this.allShardDbConfig.map((config: ShardDbConfig) => {
      const { shardId, host, port, user, password, connectionLimit } = config;
      const databaseName = this.shardDatabaseNamePrefix + shardId;

      return [
        config.shardId, 
        knex({
          client: 'mysql',
          connection: {
            host,
            port,
            user, 
            password,
            database: databaseName,
            charset: 'utf8mb4'
          },
          pool:{
            min: 0,
            max: connectionLimit
          }
        })
      ]
    });

    this.shardedDbs = _.fromPairs(connections);
    // [[0, KnexDatabase], [1, KnexDatabase]] ==> {0: KnexDatabase, 1: KnexDatabase}
    console.log("Connected to all shard databases (ShardDatabaseFacade)")
  };

  public getDb(shardId: number): Knex{
    return this.shardedDbs[shardId]
  };

  public getRandomShardId(): number{
    const shardIds: number[] = this.allShardDbConfig.map((config): number => {
      return config.shardId
    });

    return shardIds[_.random(0, shardIds.length - 1)]
  }

  // Meant for testing
  public getAllShardIds(): number[]{
    const shardIds: number[] = this.allShardDbConfig.map((config): number => {
      return config.shardId
    });

    return shardIds
  };

  public checkAllShardDatabaseTables(){
    console.log(`Checking all shard databases`);

    // get shardIds from config to retrieve dbs
    this.allShardDbConfig.map((config) => {
      const {shardId} = config;
      this.checkShardDatabaseTables(shardId);
    });
  }
 
  private async checkShardDatabaseTables(shardId: number){
    console.log(`About to run shard db migrations for shardId : ${shardId}`)
    const db = this.getDb(shardId);
    const migrationRunner = new ShardDatabaseMigrationRunner(db);
    await migrationRunner.run();
  }
}