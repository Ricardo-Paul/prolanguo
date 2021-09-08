import * as Joi from "joi";

interface Resolver<T> {
  resolve(data: any, stripUnknown: boolean): T;
  testAbstractResolver():any
}

export abstract class AbstractResolver<T extends object> implements Resolver<T> {

  // TODO: add type annotations to rules
  protected abstract rules: any
  // returns the same vlaues with received data
  resolve(data: any, stripUnknown: boolean): T {
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