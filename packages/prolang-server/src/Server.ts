import chalk = require("chalk");
import * as express from "express";

export class Server{

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

      app.listen(8082, 
        (): void => {
          // TODO: use a logger instead
          console.log(`Server is listening on port ${this.displayMessage(' 8082 ')}`)
        }
      )
    }
}