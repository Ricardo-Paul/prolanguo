import { EnvResolver } from "../resolvers/EnvResolver";
import { assertExists } from "./assertExists";
import * as _ from 'lodash';
import * as dotenv from "dotenv";

dotenv.config({
  path: "./envDB"
});

export function resolveEnv(){

  const AUTH_DATABASE_CONFIG = preprocessAuthDbConfig(
    assertExists(process.env.AUTH_DATABASE_CONFIG)
  );

  const ALL_SHARD_DATABASE_CONFIG = preprocessAllShardDbConfig(
    assertExists(process.env.ALL_SHARD_DATABASE_CONFIG)
  );

  return new EnvResolver().resolve(
    {
      AUTH_DATABASE_CONFIG,
      ALL_SHARD_DATABASE_CONFIG,
    },
    true
  )
};


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
        port,
        user,
        password,
        connectionLimit
      }
    }
  )
}


console.log(resolveEnv());
