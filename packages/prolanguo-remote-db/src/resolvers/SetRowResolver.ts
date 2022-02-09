import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { SetRow } from "../interfaces/SetRow";
import * as Joi from "joi";
import { SetStatus } from "@prolanguo/prolanguo-common/dist/enums";
import * as _ from "lodash";

export class SetRowResolver extends AbstractResolver<SetRow>{
  protected rules: { [P in keyof SetRow]: Joi.SchemaLike } = {
    userId: Joi.string(),
    setId: Joi.string(),
    setName: Joi.string(),
    setStatus: Joi.string().valid(..._.values(SetStatus)),
    learningLanguageCode: Joi.string(),
    translatedLanguageCode: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    updatedStatusAt: Joi.date(),
    firstSyncedAt: Joi.date(),
    lastSyncedAt: Joi.date()
  }
}