import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { AuthDbConfig } from "../interfaces/AuthDbConfig";
import * as Joi from "joi";

export class AuthDatabaseConfigResolver extends AbstractResolver<AuthDbConfig> {
  protected rules: Readonly<{ [K in keyof AuthDbConfig ]: Joi.SchemaLike}> = {
    host: Joi.string(),
    port: Joi.number(),
    databaseName: Joi.string(),
    user: Joi.string(),
    password: Joi.string(),
    connectionLimit: Joi.number()
  }
};
