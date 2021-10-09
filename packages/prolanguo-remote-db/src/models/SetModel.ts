import { Knex } from "knex"
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { SetRowPreparer } from "../preparers/SetRowPreparer";
import { TableName } from "../enums/tableName";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";




export class SetModel{
  private setRowPreparer: SetRowPreparer;

  constructor(){
    this.setRowPreparer = new SetRowPreparer();
  }

  public async upsertSets(db: Knex, userId: string, sets: Set[]): Promise<void> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          if(sets.length > 0){
            queries.push(
              this.insertOrIgnoreSets(
                db,
                userId,
                sets // send only validated sets
              )
            );
          }

        await Promise.all(queries);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };

  private async insertOrIgnoreSets(db: Knex, userId: string, sets: Set[]): Promise<void> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          // prepare each set for insertion
            const setRows = sets.map(
              (set): Set => {
                return this.setRowPreparer.prepareInsert(set, userId);
              }
            );

            const {sql, bindings} = db
              .insert(setRows)
              .into(TableName.SET)
              .toSQL();
            
            const replaceSql = sql.replace('insert', 'insert ignore');

            // bulk insert all rows
            queries.push(
              promisifyQuery(
                db.raw(
                  replaceSql, bindings
                )
              )
            );

            await Promise.all(queries);
            resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }
}


// unit test in
