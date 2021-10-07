import { AbstractResolver } from "@prolanguo/prolanguo-resolver"
import { Env } from "../interfaces/Env";
import { AuthDatabaseConfigResolver } from "./AuthDatabaseConfigResolver";
import { ShardDatabaseConfigResolver } from "./ShardDatabaseConfigResolver";
import * as Joi from "joi";

export class EnvResolver extends AbstractResolver<Env>{
  protected rules = {
    AUTH_DATABASE_CONFIG: Joi.object(
      new AuthDatabaseConfigResolver().getRules()
    ),
    ALL_SHARD_DATABASE_CONFIG: Joi.array().items(
      new ShardDatabaseConfigResolver().getRules()
    ),
    SHARD_DATABASE_PREFIX_NAME: Joi.string()
  }
};