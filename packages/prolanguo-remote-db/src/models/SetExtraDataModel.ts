import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";
import { Knex } from "knex";
import { SetExtraDataRowConverter } from "../converters/SetExtraDataRowConverter";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import * as _ from "lodash";

export class SetExtraDataModel {
  private setExtraDataRowConverter: SetExtraDataRowConverter;
  constructor(){
    this.setExtraDataRowConverter = new SetExtraDataRowConverter();
  }

  public async getSetExtraDataBySetIds(db: Knex, setIds: string[], userId: string): Promise<{ setExtraDataItems: {[P in string]: SetExtraDataItem[]} }>{
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
}