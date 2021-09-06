import * as express from "express"
import { ApiRequest } from "./ApiRequest";
import { ApiResponse } from "./ApiResponse";

export class ApiRouterFactory{
  constructor(){}

  public make(controllers: any): express.Router{
    const router = express.Router();
    // add some middleware to router
    this.connectControllersToRouter(controllers, router);
    return router
  }

  private connectControllersToRouter(controllers: any, router: express.Router): void {
    controllers.forEach((controller :any) => {
      const options = controller.options();

      options.paths.forEach((path: string) => {
        // request Handler
        const requestHandler = function(_req: express.Request, _res: express.Response): Promise<void>{
          const req = new ApiRequest<any>(_req, options.requestResolver); //send req for validation
          const res = new ApiResponse<any>(_res); // create a wrapper around res

          //Call ApiRequest method for testing
          req.getResolver();

          return new Promise(async (resolve, reject) => {
            try{
              // perform request validation check
              await controller.handleRequest(_req, _res);
              resolve()
            } catch(err){
              reject(err)
            }
          });
        }

        // handle request coming from each path
        const allowedMethod: 'post' | 'get' = options.allowedMethod;
        router[allowedMethod](path, requestHandler)
      });
    });
  }
}