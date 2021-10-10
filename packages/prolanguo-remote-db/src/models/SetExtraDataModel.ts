import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";
import { Knex } from "knex";
import { SetExtraDataRowConverter } from "../converters/SetExtraDataRowConverter";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";


export class SetExtraDataModel {
  private setExtraDataRowConverter: SetExtraDataRowConverter;
  constructor(){
    this.setExtraDataRowConverter = new SetExtraDataRowConverter();
  }

  public async getSetExtraDataBySetIds(db: Knex, setIds: string[], userId: string): Promise<{ setExtraDataItems: SetExtraDataItem[] }>{
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
          const setExtraDataItems = this.setExtraDataRowConverter.converToSetExtraDataItem(setExtraDataRows);
        resolve({
          setExtraDataItems
        })
        }catch(error){
          reject(error)
        }
      }
    );
  }
}