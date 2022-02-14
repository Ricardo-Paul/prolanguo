import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { SpacedRepetiontionMaxLimit } from "../../interfaces/general/SpacedRepetitionMaxLimit";
import * as Joi from "joi";
import { SetExtraDataName } from "../../enums";

export class SpacedRepetiontionMaxLimitResolver extends AbstractResolver<SpacedRepetiontionMaxLimit>{
    protected rules: any = {
        dataName: Joi.string().valid(SetExtraDataName.SPACED_REPETITION_MAX_LIMIT),
        dataValue: Joi.number(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        firstSyncedAt: Joi.date().allow(null),
        lastSyncedAt: Joi.date().allow(null)
    }
}