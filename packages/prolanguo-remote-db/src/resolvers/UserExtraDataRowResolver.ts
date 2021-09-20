import { AbstractResolver } from "@prolanguo/prolanguo-resolver";

import * as Joi from "joi";

interface UserExtraData {
  userId: string,
  dataName: string,
  dataValue: string,
  createdAt: Date,
  updatedAt: Date,
  firstSyncedAt: Date,
  lastSyncedAt: Date
}

export class UserExtraDataRowResolver extends AbstractResolver<UserExtraData> {
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