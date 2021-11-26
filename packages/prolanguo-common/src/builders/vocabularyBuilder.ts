import { Vocabulary } from "../interfaces/index";
import { DeepPartial } from "../extended-types";
import _ from "lodash";
import * as uuid from "uuid";
import { VocabularyStatus } from "../enums";
import * as moment from "moment";
import { Definition } from "../interfaces";

// builders
import { DefinitionBuilder } from "./DefinitionBuilder";
import { VocabularyCategoryBuilder } from "./VocabularyCategoryBuilder";
import { VocabularyWritingBuilder } from "./VocabularyWritingBuilder";

export class VocabularyBuilder{
  public build(vocabulary: DeepPartial<Vocabulary>){
    let definitions: Definition[] = [];
    let category;
    let writing;

    if(vocabulary.definitions !== undefined){
      definitions = vocabulary.definitions.map((definition) => {
        return new DefinitionBuilder().build(
          definition
        );
      })
    };

    if(vocabulary.category !== undefined){
      category = new VocabularyCategoryBuilder().build(
        vocabulary.category
      );
    };

    if(vocabulary.writing !== undefined){
      writing = new VocabularyWritingBuilder().build(
        vocabulary.writing
      );
    };

    return _.merge({
      vocabularyId: uuid.v4(),
      vocabularyText: "Beautiful text",
      vocabularyStatus: VocabularyStatus.ACTIVE,
      level: 1,
      definitions,
      category,
      writing,
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      updatedStatusAt: moment.utc().toDate(),
      lastLearnedAt: null,
      firstSyncedAt: null,
      lastSyncedAt: null,
    }, vocabulary)
  }
};

// readonly vocabularyId: string,
// // readonly setId: string, setId send separately
// readonly vocabularyText: string,
// readonly vocabularyStatus: VocabularyStatus,
// readonly level: number,
// readonly definitions: Definition[],
// readonly category: Category,
// readonly writing: VocabularyWriting,
// readonly lastLearnedAt: null | Date,
// readonly createdAt: Date;
// readonly updatedAt: Date;
// readonly updatedStatusAt: null | Date;
// readonly firstSyncedAt: null | Date;
// readonly lastSyncedAt: null | Date;