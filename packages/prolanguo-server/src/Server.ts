import chalk = require("chalk");
import * as express from "express";
import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { ApiControllerFactory } from "./api/ApiControllerFactory";
import { ApiRouterFactory } from "./api/ApiRouterFactory";
import { resolveEnv } from "./setup/resolveEnv";

export class Server{
  // class used as Interface
  private apiControllerFactory: ApiControllerFactory;
  private apiRouterFactory: ApiRouterFactory;
  private database: DatabaseFacade;
  private userModel: UserModel;
  private env;

  constructor(){
    this.env = resolveEnv();
    this.database = new DatabaseFacade({
      host: 'localhost',
      port: 8000,
      databaseName: 'prolanguo_auth',
      user: 'root',
      password: 'ricardo00',
      connectionLimit: 20
    });
    
    this.userModel = new UserModel

    this.apiControllerFactory = new ApiControllerFactory(
      this.database,
      this.userModel
    );
    this.apiRouterFactory = new ApiRouterFactory();
  }

  private displayMessage(message: string): void{
   console.log(`${chalk.bold.white.bgBlue(`${ message }`)}`)
  }

  public setup(){
    return new Promise(async (resolve, reject): Promise<void> => {
      try{
        this.displayMessage("Setting up database services :");
        await this.database.checkAuthDatabaseTables();
        this.database.checkShardDatabaseTalbes();

        resolve("")
      }catch(error){
        reject(error)
      }
    })
  }

    // public by default
  public start(): void{
      console.log("Starting the App")
      const app = express();
      app.use(express.urlencoded({ extended: true }))
      app.use(express.json())

      // enforce type
      const controllers: any[] = this.apiControllerFactory.makeControllers();
      app.use("/api/v1", this.apiRouterFactory.make(controllers))

      app.get('/test', function(req, res){
        console.log("Tested on console")
        res.send("testing request")
      });

      app.listen(8000, 
        (): void => {
          // TODO: use a logger instead
          console.log(`Server is listening on port 8000`);
          // console.log("CONFIG ::", dbConfig, );
          console.log("Calling resolve Env" ,resolveEnv())
        }
      )
    }
}