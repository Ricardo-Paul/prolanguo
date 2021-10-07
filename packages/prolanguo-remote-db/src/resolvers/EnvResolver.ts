import { AbstractResolver } from "@prolanguo/prolanguo-resolver"
import { Env } from "../interfaces/Env";
import * as Joi from "joi";

export class EnvResolver extends AbstractResolver<Env>{
  protected rules = {
    AUTH_DATABASE_CONFIG: Joi.object(),
    ALL_SHARD_DATABASE_CONFIG: Joi.array().items(),
    SHARD_DATABASE_PREFIX_NAME: Joi.string()
  }
}