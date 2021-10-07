import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { AuthDbConfig } from "../interfaces/AuthDbConfig";
import * as Joi from "joi";

export class AuthDatabaseConfigResolver extends AbstractResolver<AuthDbConfig>{
  protected rules = {
    host: Joi.string(),
    port: Joi.number(),
    databaseName: Joi.string(),
    user: Joi.string(),
    password: Joi.string()
  }
};