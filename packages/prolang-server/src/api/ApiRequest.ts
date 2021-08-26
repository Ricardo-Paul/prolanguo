import { Request } from "@prolang/prolang-common/interfaces";
import * as express from "express";
import * as Joi from "joi";

// Resolver interface is a blueprint for resolver methods
interface Resolver<T> {
  resolve(arg: string): any
}

// abstractResolver defines the methods
abstract class AbstractResolver<T extends object> implements Resolver<T>{
  public resolve(val: string): T{
    console.log("A value from resolve()", val)
    const r: any = "";
    return r;
  }
}

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
      console.log("Type of", typeof this.requestResolver)
      console.log("Resolver object content :", this.requestResolver) //unefined
      console.log("Resolving");
      this.requestResolver.resolve("Hello World")
      // this.requestResolver.resolve("Hello world")
      // this.requestResolver.resolve("Hello world")
    }
  }
  
}