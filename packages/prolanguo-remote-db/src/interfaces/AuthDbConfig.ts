export interface AuthDbConfig {
  readonly host: string;
  readonly port: number;
  readonly databaseName: string;
  readonly user: string;
  readonly password: string;
  readonly connectionLimit: number
}