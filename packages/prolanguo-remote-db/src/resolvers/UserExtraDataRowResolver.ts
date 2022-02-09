import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { UserExtraDataRow } from "../interfaces/UserExtraDataRow";
import * as Joi from "joi";


export class UserExtraDataRowResolver extends AbstractResolver<UserExtraDataRow> {
  rules = {
    userId: Joi.string(),
    dataName: Joi.string(),
    dataValue: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstSyncedAt: Joi.date(),
    lastSyncedAt: Joi.date()
  }
}