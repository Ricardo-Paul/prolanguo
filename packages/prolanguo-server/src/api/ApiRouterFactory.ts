import * as express from "express"
import { AuthenticatorFacade } from "../facades/AuthenticatorFacace";
import { ApiRequest } from "./ApiRequest";
import { ApiResponse } from "./ApiResponse";


export class ApiRouterFactory{
  private authenticator: AuthenticatorFacade;

  constructor(
    authenticator: AuthenticatorFacade
  ){
    this.authenticator = authenticator;
  }

  public make(controllers: any): express.Router{
    const router = express.Router();
    this.connectControllersToRouter(controllers, router);
    return router
  }

  private connectControllersToRouter(controllers: any, router: express.Router): void {
    controllers.forEach((controller :any) => {
      const options = controller.options();

      options.paths.forEach((path: string) => {

        const requestHandler = function(_req: express.Request, _res: express.Response): Promise<void>{
          const req = new ApiRequest<any>(_req, options.requestResolver); //create a wrapper around express req object
          const res = new ApiResponse<any>(_res); // create a wrapper around express res object
          // req.getResolver();
          return new Promise(async (resolve, reject) => {
            try{
              await controller.handleRequest(req, res);
              resolve()
            } catch(err){
              reject(err)
            }
          });
        }

        const allowedMethod: 'post' | 'get' = options.allowedMethod;
        if(options.authStrategies !== null){
          if(options.authStrategies.length === 0){
            throw new Error(`Please provide a strategy for authentication`);
          } else {
            router[allowedMethod](path, 
              this.authenticator.createAuthenticationMiddleware(
                options.authStrategies
              ),
              requestHandler);
          }
        } else {
          router[allowedMethod](path, requestHandler)
        }
      });
    });
  }
}