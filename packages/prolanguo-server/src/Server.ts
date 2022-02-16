import chalk = require("chalk");
import * as express from "express";
import { AuthDbConfig, DatabaseFacade, UserModel, SetModel, VocabularyModel } from "@prolanguo/prolanguo-remote-db";
import { ApiControllerFactory } from "./api/ApiControllerFactory";
import { ApiRouterFactory } from "./api/ApiRouterFactory";
import { resolveEnv } from "./setup/resolveEnv";
import { loadConfig } from "./setup/loadConfig";
import { AuthenticatorFacade } from "./facades/AuthenticatorFacace";
import { Config } from "./interfaces/Config";
import { FirebaseFacade } from "./facades/FirebaseFacade";
import { assertExists } from "./utils/assertExists";

export class Server{
  private apiControllerFactory: ApiControllerFactory;
  private apiRouterFactory: ApiRouterFactory;
  private database: DatabaseFacade;
  private userModel: UserModel;
  private setModel: SetModel;
  private vocabularyModel: VocabularyModel;
  private env;
  private config: Config;
  private authenticator: AuthenticatorFacade;
  private firebase: FirebaseFacade;

  constructor(){
    this.env = resolveEnv();
    this.config = loadConfig();
    this.userModel = new UserModel;
    this.setModel = new SetModel;
    this.vocabularyModel = new VocabularyModel;

    // TODO: remove hard coded details to .env file
    this.database = new DatabaseFacade(
      this.env.AUTH_DATABASE_CONFIG as AuthDbConfig,
      [{
        shardId: 0,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'ricardo00',
        connectionLimit: 20
      }],
      'prolanguo_shard_db_'
    );

    this.authenticator = new AuthenticatorFacade(
      'secretkEyremoveitfromhere',
      this.userModel,
      this.database
    );

    this.apiControllerFactory = new ApiControllerFactory(
      this.database,
      this.userModel,
      this.config,
      this.authenticator,
      this.setModel,
      this.vocabularyModel
    );

    this.apiRouterFactory = new ApiRouterFactory(
      this.authenticator
    );

    this.firebase = new FirebaseFacade(
      assertExists(process.env.SERVICE_ACCOUNT_CREDENTIAL_PATH),
      assertExists(process.env.DATABASE_URL),
      this.userModel
    )
  }

  public setup(){
    return new Promise(async (resolve, reject): Promise<void> => {
      try{
        resolve("")
      }catch(error){
        reject(error)
      }
    })
  }

    // public by default
  public start(): void{
      console.log("Starting the server ...");
      const app = express();
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());

      app.use(this.authenticator.registerAuthenticationStrategies());

      const controllers: any[] = this.apiControllerFactory.makeControllers();
      app.use("/api/v1", this.apiRouterFactory.make(controllers))


      app.listen(8000, 
        (): void => {
          // TODO: use a logger instead
          console.log(`Server is listening on port 8000`);
          console.log("Calling resolve Env" ,resolveEnv());
          console.log("Loading server config", this.config);
          console.log("All shardIds :", this.database.getAllShardIds());
        }
      )
    }
}