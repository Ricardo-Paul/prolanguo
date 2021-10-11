import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";
import { Knex } from "knex";
import { SetExtraDataRowConverter } from "../converters/SetExtraDataRowConverter";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { SetExtraDataRowPreparer } from "../preparers/SetExtraDataRowPreparer";

export class SetExtraDataModel {
  private setExtraDataRowConverter: SetExtraDataRowConverter;
  private setExtraDataRowPreparer: SetExtraDataRowPreparer;

  constructor(){
    this.setExtraDataRowConverter = new SetExtraDataRowConverter();
    this.setExtraDataRowPreparer = new SetExtraDataRowPreparer();
  }

  public async upsertMultipleExtraData(
    db: Knex, 
    userId: string,
    setExtraDataItemSetIdPairs: [DeepPartial<SetExtraDataItem>, string][] | []
    ): Promise<void>{
      return new Promise(
        async (resolve, reject): Promise<void> => {
          try{
            const queries = [];

            const setExtraDataRows = setExtraDataItemSetIdPairs.map(
              ([extraDataItem, setId]) => {
                return this.setExtraDataRowPreparer.prepareUpsert(
                  userId,
                  setId,
                  extraDataItem
                )
              }
            );

            const {sql, bindings} = db
                .insert(setExtraDataRows)
                .into(TableName.SET_EXTRA_DATA)
                .toSQL();

            queries.push(
              promisifyQuery(
                db.raw(
                  sql.replace('insert', 'insert ignore'), bindings
                )
              )
            );

            console.log("about to upsert set extra data", setExtraDataRows);
            queries.push(
              ...setExtraDataRows.map((row) => {
                const updateFields = _.omit(row, [
                  'userId',
                  'setId',
                  'dataName'
                ]);
                const { userId, setId, dataValue } = row;
                promisifyQuery(
                  db
                    .update(updateFields)
                    .from(TableName.SET_EXTRA_DATA)
                    .where({
                      userId,
                      setId,
                      dataValue
                    })
                )
              })
            )

          await Promise.all(queries);
          resolve()
          }catch(error){
            reject(error)
          }
        }
      );
  }

  public async getSetExtraDataBySetIds(
    db: Knex, 
    setIds: string[], 
    userId: string
    ): Promise<{ setExtraDataItems: {[P in string]: SetExtraDataItem[]} }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.select()
              .from(TableName.SET_EXTRA_DATA)
              .where({userId})
              .whereIn('setId', setIds)
          );

          // TODO: resolve this array
          const setExtraDataRows = result;

          // returns a dictionary {'setId':[{}], 'setIds': [{}, {}]}
          const setExtraDataGroupedById = _.groupBy(setExtraDataRows,
            (s) => s.setId
          );

          // JSON.parse() dataValue for each row ({})
          const setExtraDataItems = _.mapValues(setExtraDataGroupedById,
           (s) => this.setExtraDataRowConverter.converToSetExtraDataItem(s)
          );

        resolve({
          setExtraDataItems
        });

        }catch(error){
          reject(error)
        }
      }
    );
  }
};

