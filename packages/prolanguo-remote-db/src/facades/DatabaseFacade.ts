import knex, { Knex } from "knex";

import { AuthDatabaseFacade } from "./AuthDatabaseFacade";
import { ShardDatabaseFacade } from "./ShardDatabaseFacade";
import { AuthDbConfig } from "../interfaces/AuthDbConfig"


// takes configuration to instantiate both dbs
export class DatabaseFacade {
  private authDatabaseFacade: AuthDatabaseFacade;
  // private shardDatabaseFacade: ShardDatabaseFacade;

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
}