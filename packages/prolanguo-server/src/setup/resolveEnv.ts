import * as _ from 'lodash';
import * as Joi from "joi";
import { Env } from '../interfaces/Env';

// returns the value passed if not null or undefined
function assertExists<V>(value: V, message?: string): NonNullable<V>{
  if(value !== null && typeof value !== 'undefined'){
    return value as NonNullable<V>
  } else {
    throw new Error(
      message || "Assertion failed, the value is in fact null/undefined"
    )
  }
}

function resolve(data: object, rules: object){
  Joi.attempt(data, Joi.object(rules).options({
    stripUnknown: {
      arrays: true,
      objects: true
    },
    presence: "required" //everything in rules is required
  }))
}

const rules = {
  AUTH_DATABASE_CONFIG: Joi.object(),
}

export function resolveEnv(){
  const AUTH_DATABASE_CONFIG = preprocessAuthDbConfig(
    assertExists(process.env.AUTH_DATABASE_CONFIG, "AUTH_DATABASE_CONFIG is missing from env file")
  );

  const ALL_SHARD_DATABASE_CONFIG = preprocessAllShardDbConfig(
    assertExists(process.env.ALL_SHARD_DATABASE_CONFIG, "ALL_SHARD_DATABASE_CONFIG not found")
  );

  console.log("PREEE", ALL_SHARD_DATABASE_CONFIG)


  const env = {
    AUTH_DATABASE_CONFIG
  }

  console.log("env values", resolve(env, rules))
  return env
}

// transform semi-colon separated values into object
function preprocessAuthDbConfig(authDatabaseConfig: string): object{
  const match = assertExists(
    authDatabaseConfig.match(/[^()]+/), //return string contents in the first element of an array
    "Value for AUTH_DATABASE CONFIG missing"
  )

 const values = _.map(match[0].split(";"), _.trim)
 const [host, port, databaseName, user, password, connectionLimit] = values

 return { host, port, databaseName, user, password, connectionLimit: Number(connectionLimit)}
}

function preprocessAllShardDbConfig(allShardDatabaseConfig: string): object{
  const matches = assertExists(
    allShardDatabaseConfig.match(/[^()]+/g), "not found"
  )

  console.log("matches", matches)
  return matches.map(
    (match) => {
      const [shardId, host, port, user, password, connectionLimit] = _.map(
        match.split(';'),
        _.trim
      )
      return {
        shardId,
        host,
        connectionLimit
      }
    }
  )
}