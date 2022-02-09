import { SqliteDatabase } from "../core/SqliteDatabase";
import { ReactNativeSqliteDatabase } from "../react-native/ReactNativeSqliteDatabase";


export class SqliteDatabaseAdapter {
  constructor(
    private engine: any
  ){}

  createDatabase(): SqliteDatabase | undefined {
    if (this.engine.openDatabase !== "undefined") {
      return new ReactNativeSqliteDatabase(this.engine)
    }
  }
}