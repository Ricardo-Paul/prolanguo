import chalk = require("chalk");
import * as express from "express";

export class Server{

  public constructor(){

  };

  // set up sevices we'll need
  public async setup(): Promise<void> {
    return new Promise(
      async(resolve, reject): Promise<void> => {
        try{
          console.log('Setting things up')
          resolve();
        }catch (error){
          reject(error)
        }
      }
    )
  }

  // start the express App
  public start(): void{
    console.log("Starting the App")
    const app = express();
    app.listen(8082, 
      (): void => {
        // TODO: use a logger instead
        console.log(`Server is listening on port ${chalk.bold.white.bgBlue(' 8082 ')}`)
      }
    )
  }
}