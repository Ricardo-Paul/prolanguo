import { Knex } from "knex"
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { SetRowPreparer } from "../preparers/SetRowPreparer";
import { TableName } from "../enums/tableName";
import { DeepPartial } from "@prolanguo/prolanguo-common/dist/extended-types";
import * as _ from "lodash";
import { assertExists } from "../utils/assertExists";

export class SetModel{
  private setRowPreparer: SetRowPreparer;

  constructor(){
    this.setRowPreparer = new SetRowPreparer();
  }

  public async upsertSets(db: Knex, userId: string, sets: DeepPartial<Set>[] ): Promise<void> {
    console.log("upsertSet is running")
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          // bulk insert with `insert ignore` won't raise error for duplicate PK
          if(sets.length > 0){
            queries.push(
              this.insertOrIgnoreSets(
                db,
                userId,
                sets.filter((set) => {
                  return this.setRowPreparer.canBeInserted(set as Set, userId)
                }) as Set[]
              )
            );

            queries.push(
              this.updateSets(
                db,
                sets,
                userId
              )
            )
          };

        await Promise.all(queries);
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };

  // test this function
  private updateSets(db: Knex, sets: DeepPartial<Set>[], userId: string): Promise<void>{
    console.log(`Running update sets`);

    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          Promise.all(
            sets.map((set) => {
              this.updateSet(
                db,
                set,
                userId
              )
            })
          );
        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  };


  private updateSet(db: Knex, set: DeepPartial<Set>, userId: string): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const setRow = this.setRowPreparer.prepareUpdate(set, userId);
          const updateFields = _.omit(setRow, ['userId, setId']);
          const setId = assertExists(setRow.setId);

          await promisifyQuery(
            db
            .update(updateFields)
            .from(TableName.SET)
            .where({
              userId,
              setId
            })
          );

        resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }

  private async insertOrIgnoreSets(db: Knex, userId: string, sets: Set[]): Promise<void> {
    console.log("insert or ignore sets running ")
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
              await promisifyQuery(
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
};
