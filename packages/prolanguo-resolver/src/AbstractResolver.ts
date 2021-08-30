import { Request } from "@prolanguo/prolanguo-common/interfaces";
import * as Joi from "joi";

interface Resolver<T> {
  resolve(data: any, stripUnknown: boolean): T;
  testAbstractResolver():any
}

export abstract class AbstractResolver<T extends object> implements Resolver<T> {

  // TODO: add type annotations to rules
  protected abstract rules: any
  // an error key will be part of the return value
  // returns the same key with entered data
  resolve(data: any, stripUnknown: boolean): T {
    console.log("DATA receieved by resolve() ", data.body)
    return Joi.attempt(data, Joi.object(this.rules)
    .options({
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown,
      }
    }))
  }

  testAbstractResolver(): any{
    console.log(`AbstractController/testAbstractResolver about to validate data`);
  }
}