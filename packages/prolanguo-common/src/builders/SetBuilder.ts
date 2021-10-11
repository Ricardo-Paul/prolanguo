import * as _ from "lodash";
import * as uuid from "uuid";
import { SetStatus } from "../enums";
import * as moment from "moment";
import { DeepPartial } from "../extended-types";
import { Set } from "../interfaces/general/Set";
import { SetExtraDataItemBuilder } from "./SetExtraDataItemBuilder";
import { SetExtraDataItem } from "../types";


export class SetBuilder{
  public build(set: DeepPartial<Set>){
    let extraData;
    if(typeof set.extraData !== 'undefined'){
      set.extraData.map((setExtraDataItem): SetExtraDataItem => {
        return new SetExtraDataItemBuilder().build(setExtraDataItem);
      })
    }
    
    return {
      userId: uuid.v4(),
      setId: uuid.v4(),
      setName: "Learn German",
      setStatus: SetStatus.DELETED,
      learningLanguageCode: "en",
      translatedLanguageCode: "en",
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      updatedStatusAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null,
      extraData
    }
  }
}