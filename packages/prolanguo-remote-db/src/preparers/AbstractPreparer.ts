//move this to somewhere else

import * as Joi from "joi";

type Rules<T> = { [P in keyof T]: Joi.SchemaLike }

export abstract class AbstractPreparer<T> {
  protected insertRules?: Rules<T>;
  protected upsertRules?: Rules<T>;
  protected updateRules?: Rules<T>;

  protected validateData(data: any, rules: Joi.ObjectSchema){
    const { value, error } = rules.validate(data, {
      stripUnknown: true,
      presence: "required"
    });
    if(error){
      throw error
    } else {
      return value
    }
  };

  protected isDataValid(data: any, rules: Joi.ObjectSchema): boolean{
    const { error } = rules.validate(data, {
      stripUnknown: true,
      presence: "required"
    });

    return error === null
  };

}