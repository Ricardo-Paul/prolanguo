import { Request } from "@prolanguo/prolanguo-common/interfaces";
import * as express from "express";

// TODO: import properly
import { RequestResolver } from "@prolanguo/prolanguo-common/src/resolvers/request/RequestResolver";


//RequestResolver extends Abstract resolver (now has the resolve() method)

// SignUpResolver in between
export class ApiRequest<T extends Request> {
  private req: express.Request; //type for express
  requestResolver: null | RequestResolver<T>

  // TODO: add type annotation for requestResolver
  constructor(req: express.Request, requestResolver: null | RequestResolver<T>){
    this.req = req;
    this.requestResolver = requestResolver;
  }

  public getResolver(): any{
    if(this.requestResolver !== null){
      this.requestResolver.resolve(this.req, true).body;
      console.log("BODY AND QUERY :", this.req.body, this.req.query )
      this.requestResolver.testAbstractResolver();
    }
  }
}