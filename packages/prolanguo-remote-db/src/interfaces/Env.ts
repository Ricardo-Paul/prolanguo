import { AuthDbConfig } from './AuthDbConfig';
import { ShardDbConfig } from "./ShardDbConfig";

export interface Env {
  AUTH_DATABASE_CONFIG: AuthDbConfig,
  ALL_SHARD_DATABASE_CONFIG: ShardDbConfig[],
  SHARD_DATABASE_PREFIX_NAME: string
}