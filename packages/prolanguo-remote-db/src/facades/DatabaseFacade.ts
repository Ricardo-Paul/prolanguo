import { Knex } from "knex";

import { AuthDatabaseFacade } from "./AuthDatabaseFacade";
import { ShardDatabaseFacade } from "./ShardDatabaseFacade";
import { AuthDbConfig } from "../interfaces/AuthDbConfig";
import { ShardDbConfig } from "../interfaces/ShardDbConfig";


// takes configuration to instantiate both dbs
export class DatabaseFacade {
  private authDatabaseFacade: AuthDatabaseFacade;
  private shardDatbaseFacade: ShardDatabaseFacade;

  constructor(authDbConfig: AuthDbConfig,
     allShardDbConfig: ShardDbConfig[], 
     shardDatabasePrefixName: string ){
    this.authDatabaseFacade = new AuthDatabaseFacade(authDbConfig);
    this.shardDatbaseFacade = new ShardDatabaseFacade(allShardDbConfig, shardDatabasePrefixName);
  }

  public getDb(authOrShardId: 'auth' | number): Knex{
    if (authOrShardId === "auth"){
      return this.authDatabaseFacade.getDb()
    }else {
      return this.shardDatbaseFacade.getDb(authOrShardId)
    }
  } 

  public async checkAuthDatabaseTables(){
    this.authDatabaseFacade.checkAuthDatabaseTables()
  }

  public checkShardDatabaseTalbes(){
    console.log(`No implementation yet for shard db`)
  };

  public getRandomShardId(){
    return this.shardDatbaseFacade.getRandomShardId();
  }

  // meant for testing
  public getAllShardIds(){
    return this.shardDatbaseFacade.getAllShardIds();
  }
}