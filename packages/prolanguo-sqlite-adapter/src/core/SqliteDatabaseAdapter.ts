import { SqliteDatabase } from "../core/SqliteDatabase";
import { ReactNativeSqliteDatabase } from "../react-native/ReactNativeSqliteDatabase";

export class SqliteDatabaseAdapter {
  private engine: any
  constructor(
    engine: any
  ){
    this.engine = engine
  }

  createDatabase(): SqliteDatabase{
      return new ReactNativeSqliteDatabase(this.engine)
  }
}