import { DatabaseFacade, SetModel, UserModel } from "@prolanguo/prolanguo-remote-db";
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
  private setModel: SetModel;

  constructor(
    database: DatabaseFacade, 
    userModel: UserModel, 
    config: Config,
    authenticator: AuthenticatorFacade,
    setModel: SetModel
    ){
    this.database = database;
    this.userModel = userModel;
    this.config = config;
    this.authenticator = authenticator;
    this.setModel = setModel
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
      new UploadSetsController(
        this.database,
        this.setModel
      )
    ]
    return controllers
  }
}