import * as Joi from "joi";

interface Resolver<T> {
  resolve(data: any, stripUnknown: boolean): T;
  resolveArray(data: any, stripUnknown: boolean): T;
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
      },
      presence: 'required'
    }))
  };

  resolveArray(data: any, stripUnknown: boolean): T {
    return Joi.attempt(data, Joi.array().items(Joi.object(this.rules).options({
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: 'required'
    })))
  }

}