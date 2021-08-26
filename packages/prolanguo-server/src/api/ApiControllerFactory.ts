import { SignUpController } from "./controllers/SignUpControllers";

export class ApiControllerFactory {

  constructor(){}

  public makeControllers(): any[]{
    return [
      ...this.makeDefaultControllers()
    ]
  }

  // TODO: readonly type annotations for return value
  private makeDefaultControllers(): any{
    const controllers: any[] = [
      new SignUpController()
    ]
    return controllers
  }
}