import knex, { Knex } from "knex";

import { AuthDatabaseFacade } from "./AuthDatabaseFacade";
import { ShardDatabaseFacade } from "./ShardDatabaseFacade";
import { AuthDbConfig } from "../interfaces/AuthDbConfig"

// takes configuration to instantiate both dbs
export class DatabaseFacade {
  private authDatabaseFacade: AuthDatabaseFacade;

  constructor(authDbConfig: AuthDbConfig){
    this.authDatabaseFacade = new AuthDatabaseFacade(authDbConfig) 
  }

  public getDb(authOrShardId: 'auth' | number): Knex{
    if (authOrShardId === "auth"){
      return this.authDatabaseFacade.getDb()
    }else {
      // replace this with the shardDb
      return this.authDatabaseFacade.getDb()
    }
  } 

  public async checkAuthDatabaseTables(){
    this.authDatabaseFacade.checkAuthDatabaseTables()
  }

  public checkShardDatabaseTalbes(){
    console.log(`No implementation yet for shard db`)
  }
}