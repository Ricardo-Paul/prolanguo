import { Request } from "@prolanguo/prolanguo-common/interfaces";
import * as express from "express";

import { RequestResolver } from "@prolanguo/prolanguo-common/resolvers";



export class ApiRequest<T extends Request> {
  private req: express.Request; 
  requestResolver: null | RequestResolver<T>

  constructor(req: express.Request, requestResolver: null | RequestResolver<T>){
    this.req = req;
    this.requestResolver = requestResolver;
  }

  public isAuthenticated():boolean{
    return typeof this.req.user !== "undefined" && this.req.user !== null
  }

  public getResolver(): any{
    if(this.requestResolver !== null){
      this.requestResolver.resolve(this.req, true).body;
    }
  }

  public get body(): T["body"]{
    if(this.requestResolver !== null){
      return this.requestResolver.resolve(this.req, true).body
    } else {
      throw new Error(`Error: Request resolver required for req.body validation`)
    }
  }
}