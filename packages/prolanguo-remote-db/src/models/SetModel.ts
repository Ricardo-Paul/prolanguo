import { Knex } from "knex"
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { SetRowPreparer } from "../preparers/SetRowPreparer";
import { TableName } from "../enums/tableName";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetStatus } from "@prolanguo/prolanguo-common/dist/enums";
import moment = require("moment");


// remove after testing
import * as dotenv from "dotenv";
import * as path from "path";
import { UserModel } from "./UserModel";

export class SetModel{
  private setRowPreparer: SetRowPreparer;

  constructor(){
    this.setRowPreparer = new SetRowPreparer();
  }

  public async upsertSets(db: Knex, userId: string, sets: Set[]): Promise<void> {
    console.log("upsertSet is running")
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          console.log("sets length :", sets.length)
          if(sets.length > 0){
            queries.push(
              this.insertOrIgnoreSets(
                db,
                userId,
                sets.filter((set) => {
                  return this.setRowPreparer.canBeInserted(set, userId)
                })
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
