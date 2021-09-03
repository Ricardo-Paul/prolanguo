import knex, { Knex } from "knex";
import { AuthDbConfig } from "../interfaces/AuthDbConfig"

export class AuthDatabaseFacade{
  private authDb: Knex;
  private authDbConfig: AuthDbConfig;

  // TODO: remove credentials before commiting
  constructor(authDbConfig: AuthDbConfig){
    this.authDbConfig = authDbConfig;
    this.authDb = knex({
      client: 'mysql',
      connection: {
        host: this.authDbConfig.host,
        port: this.authDbConfig.port,
        database: this.authDbConfig.database,
        user: this.authDbConfig.user,
        password: this.authDbConfig.password,
        charset: "utf8mb4"
      },
      pool:{
        min: 0,
        max: this.authDbConfig.connectionLimit
      }
    })
  };

  public getDb(): Knex{
    return this.authDb
  }
}