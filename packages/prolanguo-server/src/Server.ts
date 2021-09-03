import chalk = require("chalk");
import * as express from "express";
import { DatabaseFacade } from "@prolanguo/prolanguo-remote-db";
import { ApiControllerFactory } from "./api/ApiControllerFactory";
import { ApiRouterFactory } from "./api/ApiRouterFactory";

// move config to env var
const dbConfig = {
  host: 'localhost',
  port: 8080,
  databaseName: 'dummy db name',
  user: 'dummy user',
  password: 'dummy password',
  connectionLimit: 500
}

export class Server{
  // class used as Interface
  private apiControllerFactory: ApiControllerFactory;
  private apiRouterFactory: ApiRouterFactory;
  private database: DatabaseFacade;

  constructor(){
    this.database = new DatabaseFacade(dbConfig)

    this.apiControllerFactory = new ApiControllerFactory(
      this.database
    );
    this.apiRouterFactory = new ApiRouterFactory();
  }

  private displayMessage(message: string): void{
   console.log(`${chalk.bold.white.bgBlue(`${ message }`)}`)
  }

  public setup(){
    return new Promise(async (resolve, reject): Promise<void> => {
      try{
        resolve(this.displayMessage("All services are set, ready to go."))
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
          console.log(`Server is listening on port 8000`)
        }
      )
    }
}