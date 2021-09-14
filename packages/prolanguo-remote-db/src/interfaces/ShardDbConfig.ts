export interface ShardDbConfig {
  readonly shardId: number,
  readonly host: string,
  readonly port: number,
  readonly user: string,
  readonly password: string,
  readonly connectionLimit: number
}