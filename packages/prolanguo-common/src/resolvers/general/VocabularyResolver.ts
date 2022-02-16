import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { Vocabulary } from "../../interfaces/general/Vocabulary";
import * as Joi from "joi";
import { VocabularyStatus } from "../../enums";
import * as _ from "lodash";

// NOTE: not functional yet
export class VocabularyResolver extends AbstractResolver<Vocabulary>{
    protected rules: any = {
        vocabularyId: Joi.string(),
        vocabularyText: Joi.string(),
        vocabularyStatus: Joi.string().valid(..._.values(VocabularyStatus)),
        level: Joi.number(),
        // definitions: Definition[],
        // category?: Category,
        // writing?: VocabularyWriting,
        lastLearnedAt: Joi.date().allow(null),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        firstSyncedAt: Joi.date().allow(null),
        lastSyncedAt: Joi.date().allow(null)
    }
}