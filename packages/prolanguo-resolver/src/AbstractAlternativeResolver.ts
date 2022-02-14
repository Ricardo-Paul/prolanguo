import { Resolver } from "./Resolver";
import * as Joi from "joi";

export abstract class AbstractAlternativeResolver<T> implements Resolver<T> {
    protected abstract rules: Joi.AlternativesSchema;

    public getRules(): Joi.AlternativesSchema{
        return this.rules
    };

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
}