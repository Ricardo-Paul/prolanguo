import * as _ from 'lodash';

function assertExists<V>(value: V, message?: string): NonNullable<V>{
  if(value !== null && typeof value !== 'undefined'){
    return value as NonNullable<V>
  } else {
    throw new Error(
      message || "Assertion failed, the value is in fact null/undefined"
    )
  }
}

export function resolveEnv() {
  const AUTH_DATABASE_CONFIG = preprocessAuthDbConfig(
    assertExists(process.env.AUTH_DATABASE_CONFIG, "AUTH_DATABASE_CONFIG is missing from env file")
  );
  const ALL_SHARD_DATABASE_CONFIG = preprocessAllShardDbConfig();
}

// transform semi-colon separated values into object
function preprocessAuthDbConfig(authDatabaseConfig: string): object{
  const match = assertExists(
    authDatabaseConfig.match(/[^()]+/), //return string contents in the first element of an array
    "Value for AUTH_DATABASE CONFIG missing"
  )

 const values = _.map(match[0].split(";"), _.trim)
 const [host, port, databaseName, user, password, connectionLimit] = values
 const authConfigObject = { host, port, databaseName, user, password, connectionLimit}

 return authConfigObject
}

function preprocessAllShardDbConfig(){

}