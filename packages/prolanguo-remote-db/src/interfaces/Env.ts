interface AUTH_DATABASE_CONFIG {
  readonly host: string,
  readonly port: number,
  readonly databaseName: string,
  readonly user: string,
  readonly password: string,
  readonly connectionLimit: number
}

interface SHARD_DATABASE_CONGIG{
  readonly host: string,
  readonly port: number,
  readonly shardId: number,
  readonly user: string,
  readonly password: string,
  readonly connectionLimit: number
}

export interface Env {
  AUTH_DATABASE_CONFIG: AUTH_DATABASE_CONFIG,
  ALL_SHARD_DATABASE_CONFIG: SHARD_DATABASE_CONGIG[],
  SHARD_DATABASE_PREFIX_NAME: string
}