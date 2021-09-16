import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { SignUpController } from "./controllers/SignUpControllers";
import { Config } from "../interfaces/Config";
import { AuthenticatorFacade } from "../facades/AuthenticatorFacace";

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
      )
    ]
    return controllers
  }
}