import { Definition } from "@prolanguo/prolanguo-common/interfaces";
import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from 'joi';
import { WordClasses, DefinitionStatus } from "@prolanguo/prolanguo-common/enums";
import * as _ from "lodash";

export class VocabularyDefinitionRowPreparer extends AbstractPreparer<Definition> {
  protected upsertRules = {
    userId: Joi.string(),
    vocabularyId: Joi.string(),
    definitionId: Joi.string(),
    meaning: Joi.string().optional(),
    source: Joi.string().optional(),
    wordClasses: Joi.string(), // we'll convert the wordClasses array into a JSON string
    definitionStatus: Joi.string().valid(..._.values(DefinitionStatus)).optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date().optional(),
    // might as well remove these lines
    // leave them for compliance with VocabularyRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
    // extraData: Joi.array()
  }
  public prepareUpsert(
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

    return this.validateData(definitionRowForInsert, Joi.object(this.upsertRules));
  };

  private convertToInsertRow(
    definition: Definition,
    vocabularyId: string,
    userId: string
  ){
    const {
      definitionId,
      meaning,
      source,
      definitionStatus,
      updatedStatusAt,
      createdAt,
      updatedAt,
      // extraData
    } = definition;

    return {
      definitionId,
      meaning,
      wordClasses: typeof definition.wordClasses !== 'undefined'?
        JSON.stringify(definition.wordClasses) : definition.wordClasses,
      source,
      definitionStatus,
      updatedStatusAt,
      createdAt,
      updatedAt,
      vocabularyId,
      userId,
      // extraData
    }
  };
}