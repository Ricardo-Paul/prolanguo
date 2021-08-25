import chalk = require("chalk");
import * as express from "express";
import { ApiControllerFactory } from "./api/ApiControllerFactory";
import { ApiRouterFactory } from "./api/ApiRouterFactory";


export class Server{

  // class used as Interface
  private apiControllerFactory: ApiControllerFactory;
  private apiRouterFactory: ApiRouterFactory

  constructor(){
    this.apiControllerFactory = new ApiControllerFactory();
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

      // enforce type
      const controllers: any[] = this.apiControllerFactory.makeControllers();
      app.use("/api/v1", this.apiRouterFactory.make(controllers))

      app.get('/test', function(req, res){
        console.log("Tested on console")
        res.send("testing request")
      });

      app.listen(8082, 
        (): void => {
          // TODO: use a logger instead
          console.log(`Server is listening on port 8082`)
        }
      )
    }
}