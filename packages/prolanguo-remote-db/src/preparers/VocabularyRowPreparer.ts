import { 
  VocabularyRow,
  VocabularyRowForInsert,
  VocabularyRowForUpsert
} from "../interfaces/VocabularyRow";
import { AbstractPreparer } from "./AbstractPreparer";
import { VocabularyStatus } from "@prolanguo/prolanguo-common/dist/enums";
import { Vocabulary } from "@prolanguo/prolanguo-common/interfaces";
import * as Joi from "joi";
import * as _ from "lodash";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export class VocabularyModelRowPreparer extends AbstractPreparer<VocabularyRow> {
  protected insertRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    vocabularyId: Joi.string(),
    vocabularyText: Joi.string(),
    vocabularyStatus: Joi.string().valid(..._.values(VocabularyStatus)),
    level: Joi.number(),
    lastLearnedAt: Joi.date().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date(),
    // might as well remove these lines
    // leave them for compliance with VocabularyRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
  };

  protected upsertRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    vocabularyId: Joi.string(),
    vocabularyText: Joi.string().optional(),
    vocabularyStatus: Joi.string().valid(..._.values(VocabularyStatus)).optional(),
    level: Joi.number().optional(),
    lastLearnedAt: Joi.date().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date(),
    // might as well remove these lines
    // leave them for compliance with VocabularyRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
  }

  // insert row validation methods
  public prepareInsert(
    vocabulary: Vocabulary,
    userId: string,
    setId: string
  ): VocabularyRowForInsert{
    const insertRow = this.convertToInsertRow(
      vocabulary,
      userId,
      setId
    );
    return this.validateData(insertRow, Joi.object(this.insertRules))
  };

  private convertToInsertRow(
    vocabulary: Vocabulary,
    userId: string,
    setId: string
  ): VocabularyRowForInsert{

    const vocabularyRowForInsert = {
      userId,
      setId,
      vocabularyId: vocabulary.vocabularyId,
      vocabularyText: vocabulary.vocabularyText,
      vocabularyStatus: vocabulary.vocabularyStatus,
      level: vocabulary.level,
      lastLearnedAt: vocabulary.lastLearnedAt,
      createdAt: vocabulary.createdAt,
      updatedAt: vocabulary.updatedAt,
      updatedStatusAt: vocabulary.updatedStatusAt
    };
    return vocabularyRowForInsert;
  }

  // upsert row validation methods
  public prepareUpsert(
    vocabulary: DeepPartial<Vocabulary>,
    userId: string,
    setId: string
  ): VocabularyRowForUpsert{
    const upsertRow = this.convertToUpsertRow(
      vocabulary,
      userId,
      setId
    );
    return this.validateData(upsertRow, Joi.object(this.upsertRules));
  }

  private convertToUpsertRow(
    vocabulary: DeepPartial<Vocabulary>,
    userId: string,
    setId: string
  ){
    return {
      userId,
      setId,
      vocabularyId: vocabulary.vocabularyId,
      vocabularyText: vocabulary.vocabularyText,
      vocabularyStatus: vocabulary.vocabularyStatus,
      level: vocabulary.level,
      lastLearnedAt: vocabulary.lastLearnedAt,
      createdAt: vocabulary.createdAt,
      updatedAt: vocabulary.updatedAt,
      updatedStatusAt: vocabulary.updatedStatusAt
    }
  }
}