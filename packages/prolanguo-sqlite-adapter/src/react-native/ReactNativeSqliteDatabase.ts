import { SQLiteDatabase as RNSqliteDatabase } from "react-native-sqlite-storage";
import { SqliteDatabase } from "../core/SqliteDatabase";
import { Result } from "../core/SqliteDatabase";

export interface ConnectionOptions {
  enable_foreign_key_support: boolean
};

export class ReactNativeSqliteDatabase extends SqliteDatabase {
  private db!: RNSqliteDatabase;

  constructor(
    private engine: any
  ) {
    super()
  }

  public async open(name: string, options: ConnectionOptions): Promise<void> {

    const openCB = () => {console.log(`${name} DB successfully open`)};
    const errorCB = () => {console.log(`Error while opeing ${name} DB`)}

    // open the db in WebSQL style
    var db = this.engine.openDatabase({name, createFromLocation : 1}, openCB, errorCB);

    if(options.enable_foreign_key_support){
      db.transaction((tx: any) => {
        tx.executeSql('PRAGMA foreign_keys=ON;', [], (tx: any, results: any) => {
          console.log("Foreign keys support is ON");
        }, (error: any) => {
          console.log("Failed to turn on foreign keys", error);
        });
      })
    }

    // making sure tables are loaded / table with dummy data
    db.transaction(function(tx: any){
      tx.executeSql("SELECT * FROM prolanguo_app",[], (tx: any, results: any) => {
        let len = results.rows.length;
        let rows = []
        for(let i = 0; i < len; i++){
          const row = results.rows.item(i);
          rows.push(row)
        }
        console.log('logging rows for testing:', rows)
      }, (error: any) => {
        console.log("failed to create table", error)
      })
    });
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