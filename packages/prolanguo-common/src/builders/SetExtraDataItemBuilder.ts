import { SetExtraDataItem } from "../types/SetExtraDataItem";
import { DeepPartial } from "../extended-types";
import * as _ from "lodash";
import { SetExtraDataName } from "../enums";
import * as moment from "moment";



export class SetExtraDataItemBuilder{
    public build(setExtraData: DeepPartial<SetExtraDataItem>){
      
      return _.merge({
        dataName: SetExtraDataName.SPACED_REPETITION_MAX_LIMIT,
        dataValue: 10,
        createdAt: moment.utc().toDate(),
        updatedAt: moment.utc().toDate(),
        firstSyncedAt: null,
        lastSyncedAt: null
      }, 
      setExtraData
    )
  }
}