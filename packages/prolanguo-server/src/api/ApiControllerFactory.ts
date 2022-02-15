import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { Config } from "../interfaces/Config";
import { AuthenticatorFacade } from "../facades/AuthenticatorFacace";

import { SignUpController } from "./controllers/SignUpControllers";
import { SignInController } from "./controllers/SignInController";
import { UploadSetsController } from "./controllers/UploadSetsController";

export class ApiControllerFactory {
  private database: DatabaseFacade;
  private userModel: UserModel;
  private config: Config;
  private authenticator: AuthenticatorFacade;

  constructor(
    database: DatabaseFacade, 
    userModel: UserModel, 
    config: Config,
    authenticator: AuthenticatorFacade
    ){
    this.database = database;
    this.userModel = userModel;
    this.config = config;
    this.authenticator = authenticator;
  } 

  public makeControllers(): any[]{
    return [
      ...this.makeDefaultControllers()
    ]
  }

  // TODO: readonly type annotations for return value
  private makeDefaultControllers(): any{
    const controllers: any[] = [
      new SignUpController(
        this.database,
        this.userModel,
        this.config,
        this.authenticator
      ),
      new SignInController(
        this.database,
        this.userModel,
        this.authenticator
      ),
      new UploadSetsController()
    ]
    return controllers
  }
}