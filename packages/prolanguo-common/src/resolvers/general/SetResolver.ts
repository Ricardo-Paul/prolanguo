import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import { Set } from "../../interfaces/general/Set";
import * as Joi from "joi";
import * as _ from "lodash";
import { SetStatus } from "../../enums";
import { SetExtraDataItemResolver } from "./SetExtraDataItemResolver";

export class SetResolver extends AbstractResolver<Set>{
    private setExtraDataItemResolver = new SetExtraDataItemResolver();

    protected rules: any = {
        userId: Joi.string(),
        setId: Joi.string(),
        setName: Joi.string(),
        setStatus: Joi.string().valid(..._.values(SetStatus)),
        learningLanguageCode: Joi.string(),
        translatedLanguageCode: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        updatedStatusAt: Joi.date(),
        firstSyncedAt: Joi.date().allow(null),
        lastSyncedAt: Joi.date().allow(null),
        extraData: Joi.array().items(this.setExtraDataItemResolver.getRules())
    }
}
