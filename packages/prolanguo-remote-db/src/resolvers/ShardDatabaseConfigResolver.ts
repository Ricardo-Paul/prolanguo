import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import {ShardDbConfig } from "../interfaces/ShardDbConfig";
import * as Joi from "joi";

export class ShardDatabaseConfigResolver extends AbstractResolver<ShardDbConfig>{  
  protected rules: Readonly<{ [K in keyof ShardDbConfig ]: Joi.SchemaLike}> = {
    host: Joi.string(),
    port: Joi.number(),
    shardId: Joi.number(),
    user: Joi.string(),
    password: Joi.string(),
    connectionLimit: Joi.number()
  }
};
