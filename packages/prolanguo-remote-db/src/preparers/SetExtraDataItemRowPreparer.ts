import { AbstractPreparer } from "./AbstractPreparer";
import { SetExtraDataRow, SetExtraDataRowForUpsert } from "../interfaces/SetExtraDataRow";
import { SetExtraDataName } from "@prolanguo/prolanguo-common/enums";
import { SetExtraDataItem } from "@prolanguo/prolanguo-common/types";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import * as Joi from "joi";
import * as _ from "lodash";

export class SetExtraDataRowPreparer extends AbstractPreparer<SetExtraDataRow>{
  protected upsertRules = {
    userId: Joi.string(),
    setId: Joi.string(),
    dataName: Joi.string().valid(..._.values(SetExtraDataName)),
    dataValue: Joi.string(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    firstSyncedAt: Joi
      .forbidden()
      .strip()
      .optional(),
    lastSyncedAt: Joi
      .forbidden()
      .strip()
  };

  public prepareUpsert(
    userId: string,
    setId: string, 
    setExtraDataItem: DeepPartial<SetExtraDataItem>): SetExtraDataRowForUpsert{
    const extraDataRow = this.convertToSetExtraDataRow(
      userId,
      setId,
      setExtraDataItem
    )
    return this.validateData(extraDataRow, Joi.object(this.upsertRules));
  };

  private convertToSetExtraDataRow(
    userId: string,
    setId: string, 
    setExtraDataItem: DeepPartial<SetExtraDataItem>
  ): SetExtraDataRowForUpsert{
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