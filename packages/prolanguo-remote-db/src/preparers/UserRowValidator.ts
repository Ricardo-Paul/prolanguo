import Joi = require("joi");

abstract class AbstractPreparer{
  protected insertRules;
  protected upsertRules;
  protected updateRules;

  protected validateData(data, rules: Joi.ObjectSchema){
    const { value, error } = rules.validate(data, {
      stripUnknown: true,
      presence: "required"
    });
    console.log("FROM VALIDATE DATA", value, error)
    if(error){
      throw error
    } else {
      return value
    }
  }
}

export class UserRowValidator extends AbstractPreparer{
  insertRules = {
    userId: Joi.string(),
    shardId: Joi.number(),
    email: Joi.string()
  }

  public validateInsertRow(data){
    return this.validateData(data, Joi.object(this.insertRules));
  }
}