import { VocabularyWriting } from "../interfaces";
import { DeepPartial } from "../extended-types";
import * as _ from "lodash";
import * as moment from "moment";

export class VocabularyWritingBuilder{
  public build(writing: DeepPartial<VocabularyWriting>): VocabularyWriting{
    return _.merge({
      level: 1,
      disabled: false,
      lastWrittenAt: moment.utc().toDate(),
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null
    }, writing)
  }
};