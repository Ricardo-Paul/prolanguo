import { SQLiteDatabase as RNSqliteDatabase } from "react-native-sqlite-storage";
import { SqliteDatabase } from "../core/SqliteDatabase";
import { Result } from "../core/SqliteDatabase";

export interface ConnectionOptions {
  enable_foreign_key_support: boolean
};


export class ReactNativeSqliteDatabase extends SqliteDatabase {
  private db!: RNSqliteDatabase;

  constructor(
    private engine: {
      openDatabase: (
        name: string,
        location: string,
        okCallback: () => void,
        errorCallback: (errors?: any) => void
      ) => RNSqliteDatabase
    }
  ) {
    super()
  }

  public async open(name: string, options: ConnectionOptions): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.db = this.engine.openDatabase(name, "default",
       () => {
         resolve();
       },
       (errors) => 
        reject(errors)
      )
    }).then(async () => {
      if(options.enable_foreign_key_support){
        await this.executeSql('PRAGMA foreign_keys = ON')
      }
    })
  }

  public async executeSql(statement: string, params?: any[]): Promise<Result> {
    return new Promise<Result>(async (resolve, reject) => {
      this.db.executeSql(statement, params, (resultSet: any) => {
        const rows = [];
        let len = resultSet.rows.length;
        for(let i = 0; i < len; i++){
          let row = resultSet.row.item(i);
          rows.push(row);
        };
        resolve({ rows })
      }),
      (error: any) => {
        reject(error)
      }
    })
  }
}