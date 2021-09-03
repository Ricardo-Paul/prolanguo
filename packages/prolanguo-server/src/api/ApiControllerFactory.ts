import { DatabaseFacade } from "@prolanguo/prolanguo-remote-db";
import { SignUpController } from "./controllers/SignUpControllers";


export class ApiControllerFactory {
  private database: DatabaseFacade;

  constructor(database: DatabaseFacade){
    this.database = database
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
        this.database
      )
    ]
    return controllers
  }

}