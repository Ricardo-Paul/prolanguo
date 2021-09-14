import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import * as Joi from "joi";
import { Config } from "../interfaces/Config";

export class ConfigResolver extends AbstractResolver<Config>{
  rules = {
    shardDb: {
      shardDatabaseNamePrefix: Joi.string()
    }
  }
}