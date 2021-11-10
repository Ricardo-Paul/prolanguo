import { Definition } from "@prolanguo/prolanguo-common/interfaces";
import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from 'joi';
import { WordClass, DefinitionStatus } from "@prolanguo/prolanguo-common/enums";
import * as _ from "lodash";

export class VocabularyDefinitionRowPreparer extends AbstractPreparer<Definition>{
  protected insertRules = {
    definitionId: Joi.string(),
    meaning: Joi.string(),
    source: Joi.string(),
    wordClasses: Joi.string().valid(..._.values(WordClass)),
    definitionStatus: Joi.string().valid(..._.values(DefinitionStatus)),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date(),
    // might as well remove these lines
    // leave them for compliance with VocabularyRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
  }
  public prepareInsert(
    definition: Definition,
    vocabularyId: string,
    userId: string
  ){
    const definitionRow = this.convertToInsertRow(
      definition,
      vocabularyId,
      userId
    );

    return this.validateData(definitionRow, Joi.object(this.insertRules))
  };

  private convertToInsertRow(
    definition: Definition,
    vocabularyId: string,
    userId: string
  ){
    const {
      definitionId,
      meaning,
      wordClasses,
      source,
      definitionStatus,
      updatedStatusAt
    } = definition;

    return {
      definitionId,
      meaning,
      wordClasses,
      source,
      definitionStatus,
      updatedStatusAt,
      vocabularyId,
      userId
    }
  }
}