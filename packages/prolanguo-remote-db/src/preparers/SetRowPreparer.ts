import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from "joi";
import { SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import * as _ from "lodash";
import { SetRow } from "../interfaces/SetRow";
import { SetRowForInsert } from "../interfaces/SetRow";
import { SetRowForUpdate } from "../interfaces/SetRow";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";

export class SetRowPreparer extends AbstractPreparer<SetRow>{
  protected insertRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    setName: Joi.string(),
    setStatus: Joi.string().valid(..._.values(SetStatus)),
    learningLanguageCode: Joi.string(),
    translatedLanguageCode: Joi.string(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date(),
    // might as well remove these lines
    // leave them for compliance with SetRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
  };

  protected updateRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    setName: Joi.string().optional(),
    setStatus: Joi.string().valid(..._.values(SetStatus)).optional(),
    learningLanguageCode: Joi.string().optional(),
    translatedLanguageCode: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    updatedStatusAt: Joi.date(),
    // might as well remove these lines
    // leave them for compliance with SetRow interface
    firstSyncedAt: Joi.forbidden().strip().optional(),
    lastSyncedAt: Joi.forbidden().strip().optional(),
  }

  public prepareInsert(set: Set, userId: string){
    const setRow = this.convertToInsertRow(set, userId);
    return this.validateData(setRow, Joi.object(this.insertRules));
  }

  public prepareUpdate(set: DeepPartial<Set>, userId: string): SetRowForUpdate{
    const setRow = this.convertToUpdateRow(set, userId);
    return this.validateData(setRow, Joi.object(this.updateRules));
  }

  public canBeInserted(set: Set, userId: string): boolean{
    const setRow = this.convertToInsertRow(set, userId);
    return this.isDataValid(setRow, Joi.object(this.insertRules));
  };

  private convertToUpdateRow(set: DeepPartial<Set>, userId: string): SetRowForUpdate{
    const {
      setId, 
      setName, 
      setStatus, 
      learningLanguageCode, 
      translatedLanguageCode,
      createdAt,
      updatedAt,
      updatedStatusAt,
    } = set;
    return {
      userId,
      setId,
      setName,
      setStatus,
      learningLanguageCode,
      translatedLanguageCode,
      createdAt,
      updatedAt,
      updatedStatusAt,
    }
  }

  private convertToInsertRow(set: Set, userId: string): SetRowForInsert {
    const {
      setId, 
      setName, 
      setStatus, 
      learningLanguageCode, 
      translatedLanguageCode,
      createdAt,
      updatedAt,
      updatedStatusAt,
    } = set
    return {
      userId,
      setId,
      setName,
      setStatus,
      learningLanguageCode,
      translatedLanguageCode,
      createdAt,
      updatedAt,
      updatedStatusAt,
    }
  }
}