import { Definition } from "../interfaces";
import { DeepPartial } from "../extended-types";
import * as _ from "lodash";
import * as uuid from "uuid";
import * as moment from "moment";
import { DefinitionStatus, WordClass } from "../enums";

export class DefinitionBuilder{
  public build(definition: DeepPartial<Definition>): Definition{
    return _.merge({
      definitionId: uuid.v4(),
      meaning: "something that produces sound",
      source: "wikipedia",
      wordClasses: WordClass.NOUN,
      definitionStatus: DefinitionStatus.ACTIVE,
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      updatedStatusAt: moment.utc().toDate(),
      firstSyncedAt: null,
      lastSyncedAt: null,
    }, definition );
  }
};