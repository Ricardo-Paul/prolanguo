import { AbstractPreparer } from "./AbstractPreparer";
import { VocabularyWriting } from "@prolanguo/prolanguo-common/interfaces";
import * as Joi from "joi";
import * as _ from "lodash";
import {  WritinRow, WritingRowForUpsert} from "../interfaces/WritingRow";

export class VocabularyWritingRowPreparer extends AbstractPreparer<VocabularyWriting> {
  protected upsertRules = {
    userId: Joi.string(),
    vocabularyId: Joi.string(),
    level: Joi.number().optional(),
    lastWrittenAt: Joi.date().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    disabled: Joi.boolean(),
    // might as well remove these lines
    // leave them for compliance with VocabularyRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
  }

  // insert row validation methods
  public prepareUpsert(
    vocabularyWriting: VocabularyWriting,
    userId: string,
    vocabularyId: string
  ): WritingRowForUpsert{
    const rowForUpsert = {
      userId,
      vocabularyId,
      level: vocabularyWriting.level,
      lastWrittenAt: vocabularyWriting.lastWrittenAt,
      disabled: vocabularyWriting.disabled,
      createdAt: vocabularyWriting.createdAt,
      updatedAt: vocabularyWriting.updatedAt
    };

    return this.validateData(rowForUpsert, Joi.object(this.upsertRules));
  }
}