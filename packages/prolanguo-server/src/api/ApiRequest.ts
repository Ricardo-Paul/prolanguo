import { Request } from "@prolanguo/prolanguo-common/interfaces";
import * as express from "express";
import { AbstractResolver } from "@prolanguo/prolanguo-resolver/"

//RequesResolver extends Abstract resolver (now has the resolve() method)
export abstract class RequestResolver<T extends Request> extends AbstractResolver<Pick<T, 'query' | 'body'>>{}

// SignUpResolver in between
export class ApiRequest<T extends Request> {
  private req: express.Request; //type for express
  requestResolver: null | RequestResolver<T>

  // TODO: add type annotation for requestResolver
  // does requestResolver now has the props defined in abstractResolver?
  constructor(req: express.Request, requestResolver: null | RequestResolver<T>){
    this.req = req;
    this.requestResolver = requestResolver;
  }

  public getResolver(): any{
    if(this.requestResolver !== null){
      console.log("Resolving");
      this.requestResolver.resolve(this.req, true).body;
      console.log("THE BODY :", this.req.body, this.req.url)
      this.requestResolver.testAbstractResolver();
    }
  }
}