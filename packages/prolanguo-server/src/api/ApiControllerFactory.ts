import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { SignUpController } from "./controllers/SignUpControllers";


export class ApiControllerFactory {
  private database: DatabaseFacade;
  private userModel: UserModel;

  constructor(database: DatabaseFacade, userModel: UserModel){
    this.database = database;
    this.userModel = userModel;
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
        this.userModel
      )
    ]
    return controllers
  }

}