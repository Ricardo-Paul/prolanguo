import { Definition } from "@prolanguo/prolanguo-common/interfaces";
import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from 'joi';
import { WordClass, DefinitionStatus } from "@prolanguo/prolanguo-common/enums";
import * as _ from "lodash";

export class VocabularyDefinitionRowPreparer extends AbstractPreparer<Definition>{

  // kinda redundant to have insert when we have upsert
  protected insertRules = {
    userId: Joi.string(),
    definitionId: Joi.string(),
    vocabularyId: Joi.string(),
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
    lastSyncedAt: Joi.forbidden().strip().optional()
  }

  protected upsertRules = {
    userId: Joi.string(),
    vocabularyId: Joi.string(),
    definitionId: Joi.string(),
    meaning: Joi.string().optional(),
    source: Joi.string().optional(),
    wordClasses: Joi.string().valid(..._.values(WordClass)).optional(),
    definitionStatus: Joi.string().valid(..._.values(DefinitionStatus)).optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date().optional(),
    // might as well remove these lines
    // leave them for compliance with VocabularyRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional()
  }
  public prepareInsert(
    definition: Definition,
    vocabularyId: string,
    userId: string
  ){

    console.log("Definition in prepare insert :", definition);
    const definitionRowForInsert = this.convertToInsertRow(
      definition,
      vocabularyId,
      userId
    );

    return this.validateData(definitionRowForInsert, Joi.object(this.insertRules))
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
      updatedStatusAt,
      createdAt,
      updatedAt
    } = definition;

    return {
      definitionId,
      meaning,
      wordClasses,
      source,
      definitionStatus,
      updatedStatusAt,
      createdAt,
      updatedAt,
      vocabularyId,
      userId
    }
  };

  // TODO: replace update by upsert
  public prepareUpdate(
    definition: Definition,
    vocabularyId: string,
    userId: string
  ){
    const definitionRowForUpsert = this.convertToUpdateRow(
      definition,
      vocabularyId,
      userId
    );

    return this.validateData(definitionRowForUpsert, Joi.object(this.upsertRules))
  };

  private convertToUpdateRow(
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

    const definitionRow = {
      definitionId,
      meaning,
      wordClasses,
      source,
      definitionStatus,
      updatedStatusAt,
      vocabularyId,
      userId
    }
    
    return definitionRow;
  }
}