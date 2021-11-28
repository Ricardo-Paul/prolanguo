import { Definition } from "../interfaces";
import { DeepPartial } from "../extended-types";
import * as _ from "lodash";
import * as uuid from "uuid";
import * as moment from "moment";
import { DefinitionStatus, WordClasses } from "../enums";

export class DefinitionBuilder{
  public build(definition: DeepPartial<Definition>){
    return _.merge({
      definitionId: uuid.v4(),
      meaning: "something that produces sound",
      source: "wikipedia",
      // wordClasses: [WordClasses.ADJECTIVE],
      definitionStatus: DefinitionStatus.ACTIVE,
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      updatedStatusAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null,
      // extraData: []
    }, definition );
  }
};