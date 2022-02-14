import * as Joi from "joi";
import { Resolver } from "./Resolver";


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

  resolveArray(data: any, stripUnknown: boolean): ReadonlyArray<T> {
    return Joi.attempt(data, Joi.array().items(Joi.object(this.rules).options({
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: 'required'
    })))
  };

  // Build a deepPartial Type to set as return type
  resolvePartial(data: any, stripUnknown: boolean){
    return Joi.attempt(data, Joi.object(this.rules).options({
      stripUnknown: {
        arrays: stripUnknown,
        objects: stripUnknown
      },
      presence: "optional"
    }))
  };

  getRules(){
    return this.rules
  }
}