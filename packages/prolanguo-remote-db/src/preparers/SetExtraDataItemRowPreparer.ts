import { AbstractPreparer } from "./AbstractPreparer";
import { SetExtraDataRow, SetExtraDataRowForInsert } from "../interfaces/SetExtraDataRow";
import { SetExtraDataName } from "@prolanguo/prolanguo-common/enums";
import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";
import * as Joi from "joi";
import * as _ from "lodash";

export class SetExtraDataItemRowPreparer extends AbstractPreparer<SetExtraDataRow>{
  protected insertRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    dataName: Joi.string().valid(..._.values(SetExtraDataName)),
    dataValue: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstSyncedAt: Joi
      .forbidden()
      .strip()
      .optional(),
    lastSyncedAt: Joi
      .forbidden()
      .strip()
  };

  public prepareInsert(
    userId: string,
    setId: string, 
    setExtraDataItem: SetExtraDataItem): SetExtraDataRowForInsert{
    const extraDataRow = this.convertToSetExtraDataRow(
      userId,
      setId,
      setExtraDataItem
    )
    return this.validateData(extraDataRow, Joi.object(this.insertRules));
  };

  private convertToSetExtraDataRow(
    userId: string,
    setId: string, 
    setExtraDataItem: SetExtraDataItem
  ): SetExtraDataRowForInsert{
    return {
      userId,
      setId,
      dataName: setExtraDataItem.dataName,
      dataValue: JSON.stringify(setExtraDataItem.dataValue),
      createdAt: setExtraDataItem.createdAt,
      updatedAt: setExtraDataItem.updatedAt
    }
  }
}