import knex, { Knex } from "knex";
import { AuthDbConfig } from "../interfaces/AuthDbConfig";
import * as chalk from "chalk";
import { AuthDatabaseMigrationRunner } from "../database-migrations/AuthDatabaseMigrationRunner";

function displayMessage(message: string): void{
  console.log(`${chalk.bold.white.bgBlue(`${ message }`)}`)
 }

export class AuthDatabaseFacade {
  private authDb: Knex;
  private authDbConfig: AuthDbConfig;

  constructor(authDbConfig: AuthDbConfig){
    console.log("AuthDB Facade constructor");

    this.authDbConfig = authDbConfig;
    this.authDb = knex({
      client: 'mysql',
      connection: {
        host: this.authDbConfig.host,
        // port: 3306, //would prevent table creation
        database: this.authDbConfig.databaseName,
        user: this.authDbConfig.user,
        password: this.authDbConfig.password,
        charset: "utf8mb4"
      },
      pool:{
        min: 0,
        max: this.authDbConfig.connectionLimit,
        propagateCreateError: false
      },
      debug: true
    });
  };

  public getDb(): Knex {
    return this.authDb
  }

  public checkAuthDatabaseTables(){
    displayMessage(`Checking auth database tables ...`);
    const migrationRunner = new AuthDatabaseMigrationRunner(this.authDb)

    migrationRunner.run();
  }
}