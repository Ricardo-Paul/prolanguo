import { Knex } from "knex"
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { TableName } from "../enums/tableName";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import * as _ from "lodash";
import { assertExists } from "../utils/assertExists";
import { SetRowPreparer } from "../preparers/SetRowPreparer";
import { SetRowResolver } from "../resolvers/SetRowResolver";
import { SetRow } from "../interfaces/SetRow";
import { SetExtraDataModel } from "./SetExtraDataModel";
import { SetRowConverter } from "../converters/SetRowConverter";
import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";
import * as moment from "moment";

export class SetModel{
  private setRowPreparer: SetRowPreparer;
  private setRowResolver: SetRowResolver;
  private setExtraDataModel: SetExtraDataModel;
  private setRowConverter: SetRowConverter;

  constructor(){
    this.setRowPreparer = new SetRowPreparer();
    this.setRowResolver = new SetRowResolver();
    this.setExtraDataModel = new SetExtraDataModel();
    this.setRowConverter = new SetRowConverter();
  }

  public async getSetsByLastSyncTime(
    db: Knex,
    userId: string,
    startAt: Date | undefined,
    softLimit: number
  ): Promise<{
    setList: Set[],
    noMore: boolean
  }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{

          const date = typeof startAt === 'undefined'? 
            moment.unix(0).toDate():
            startAt;

          const firstQuery = promisifyQuery(
            db
            .select()
            .from(TableName.SET)
            .where('userId', userId)
            .where('lastSyncedAt', '=', date)
          );

          const secondQuery = promisifyQuery(
            db 
            .select()
            .from(TableName.SET)
            .where('userId', userId)
            .where('lastSyncedAt', '>', date)
            .limit(softLimit)
          );
          
          const [firstResult, secondResult] = await Promise.all([firstQuery, secondQuery]);
          const noMore = secondResult.length === 0;
          const result = _.union(firstResult, secondResult);
          const setRows = this.setRowResolver.resolveArray(result, true);

          const {
            setList
          } = await this.getCompleteSetByRows(
            db, userId, setRows
          );

        resolve({
          setList,
          noMore
        });
        }catch(error){
          reject(error)
        }
      }
    );
  }

  public async getLatestSyncTime(
    db: Knex,
    userId: string
  ): Promise<{latestSyncTime: Date | null}>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db
            .max('lastSyncedAt AS latestSyncTime')
            .from(TableName.SET)
            .where({ userId })
          );

          const resultObject = assertExists(result);

          if(resultObject.length > 0){
            const latestSyncTime = resultObject[0].latestSyncTime;

            resolve(latestSyncTime);
          } else {
            resolve({
              latestSyncTime: null
            })
          }
            
        }catch(error){
          reject(error)
        }
      }
    );
  }

  public async getExistingSetIds(
    db: Knex,
    userId: string,
    setIds: string[]
  ): Promise<{ existingSetIds: string[] }>{
    console.log("Request hits getExistingSetIds")
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.
            select('setId')
            .from(TableName.SET)
            .where({userId})
            .whereIn('setId', setIds)
          );

          const existingSetIds = result.map((set: SetRow) => {
            return set.setId
          })


        resolve({
          existingSetIds
        })
        }catch(error){
          reject(error)
        } 
      }
    );
  }

  public async getSetsByIds(db: Knex, setIds: string[], userId: string): Promise<Set[]>{
    return new Promise(async (resolve, reject): Promise<void> => {
      try{
        const result = await promisifyQuery(
          db.select()
            .from(TableName.SET)
            .where({userId})
            .whereIn('setId', setIds)
        );

         
        const setRow = this.setRowResolver.resolveArray(result, true);
        const { setList } = await this.getCompleteSetByRows(
          db,
          userId,
          setRow
        );

        resolve(
          setList
        )
      }catch(error){
        reject(error)
      }
    })
  };

  private getCompleteSetByRows(db: Knex, userId: string, setRows: readonly SetRow[]): Promise<{setList: Set[]}>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          let setList: Set[] = [];
          const setIds = setRows.map((setRow): string => setRow.setId);
          const {
            setExtraDataItems
          } = await this.setExtraDataModel.getSetExtraDataBySetIds(db, setIds, userId);

          setList = setRows.map((setRow) => {
            const setExtraData = setExtraDataItems[setRow.setId] // get ExtraData for each set from the dictionary
            return this.setRowConverter.convertToSet(setRow, setExtraData); // merge set with extra data
          });

        resolve({
          setList
        })
        }catch(error){
          reject(error)
        }
      }
    );
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
            );

            const extraDataItemAndSetPairs = _.flatMap(sets, (set): [DeepPartial<SetExtraDataItem>, string][] => {
              if(typeof set.extraData !== 'undefined'){
                return set.extraData.map((setExtraDataItem) => {
                  return [ setExtraDataItem, assertExists(set.setId) ]
                })
              } else {
                return []
              }
            });

            // only call upsertMultipleExtraData when they exist to prevent 'query is empty error'
            sets.forEach((set) => {
              if(set.extraData !== undefined && set.extraData.length > 0){
                queries.push(
                  this.setExtraDataModel.upsertMultipleExtraData(
                    db, 
                    userId,
                    extraDataItemAndSetPairs
                  )
                );
              }
            });

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
  };

};
