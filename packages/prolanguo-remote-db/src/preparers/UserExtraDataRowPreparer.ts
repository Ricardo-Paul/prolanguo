import { UserExtraDataRowForUpsert } from "../interfaces/UserExtraDataRowForUpsert";
import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from "joi";

// remove duplicate interface
interface UserExtraDataRow {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: Date;
  lastSyncedAt: Date;
}


export class UserExtraDataRowPreparer extends AbstractPreparer<UserExtraDataRow>{
  protected upsertRules = {
    userId: Joi.string(),
    dataName: Joi.string(),
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
      .optional()
  }

  public prepareUpsert(
    userExtraDataRow: UserExtraDataRow,
    userId: string
    ){
    const row = this.convertToUserExtraDataRow(userExtraDataRow, userId)
    return this.validateData(row, Joi.object(this.upsertRules));
  };

  public convertToUserExtraDataRow(
    userExtraDataRow: UserExtraDataRow,
    userId: string
  ): UserExtraDataRowForUpsert {
    // construct an extra data row for the table
    const row = {
      userId,
      dataName: userExtraDataRow.dataName,
      dataValue: userExtraDataRow.dataValue,
      createdAt: userExtraDataRow.createdAt,
      updatedAt: userExtraDataRow.updatedAt,
      firstSyncedAt: null,
      lastSyncedAt: null
    }

    return row
  }
}