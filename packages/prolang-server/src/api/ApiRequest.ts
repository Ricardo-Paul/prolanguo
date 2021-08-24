import { Request } from "@prolang/prolang-common/interfaces";
import * as express from "express";

export class ApiRequest<T extends Request>{
  private req: express.Request; //type for express
  private requestResolver; 

  // TODO: add type annotation for requestResolver
  constructor(req: express.Request, requestResolver: any){
    this.req = req;
    this.requestResolver = requestResolver;
  }
}