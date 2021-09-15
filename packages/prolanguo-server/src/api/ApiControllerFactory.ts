import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { SignUpController } from "./controllers/SignUpControllers";
import { Config } from "../interfaces/Config";

export class ApiControllerFactory {
  private database: DatabaseFacade;
  private userModel: UserModel;
  private config: Config;

  constructor(database: DatabaseFacade, userModel: UserModel, config: Config){
    this.database = database;
    this.userModel = userModel;
    this.config = config;
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
        this.config
      )
    ]
    return controllers
  }

}