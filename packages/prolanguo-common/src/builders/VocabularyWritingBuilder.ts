import { VocabularyWriting } from "../interfaces";
import { DeepPartial } from "../extended-types";
import * as _ from "lodash";
import * as moment from "moment";

export class VocabularyWritingBuilder{
  public build(category: DeepPartial<VocabularyWriting>){
    return _.merge({
      level: 1,
      disabled: false,
      lastWrittenAt: null,
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      lastLearnedAt: null,
      firstSyncedAt: null,
    }, category)
  }
};

// readonly level: number,
// readonly disabled: boolean,
// readonly lastWrittenAt: null | Date,
// readonly createdAt: Date;
// readonly updatedAt: Date;
// readonly firstSyncedAt: null | Date;
// readonly lastSyncedAt: null | Date;