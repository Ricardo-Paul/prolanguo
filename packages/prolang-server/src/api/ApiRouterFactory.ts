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

          // redefine the interface of express req and res
          const req = new ApiRequest(_req, options.requestResolver);
          const res = new ApiResponse<any>(_res);

          return new Promise(async (resolve, reject) => {
            try{
              // perform requset validity check
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