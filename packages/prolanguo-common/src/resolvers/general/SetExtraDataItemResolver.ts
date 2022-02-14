import { AbstractAlternativeResolver } from "@prolanguo/prolanguo-resolver";
import { SetExtraDataItem } from "../../types";
import * as Joi from "joi";

// single settings resolvers
import { SpacedRepetiontionMaxLimitResolver } from "./SpacedRepetitionMaxLimitResolver";

export class SetExtraDataItemResolver extends AbstractAlternativeResolver<SetExtraDataItem>{
    private spacedRepetitionMaxLimitResolver = new SpacedRepetiontionMaxLimitResolver;

    protected rules: Joi.AlternativesSchema;

    constructor(){
        super()
        this.rules = Joi.alternatives().try(
            this.spacedRepetitionMaxLimitResolver.getRules()
        )
    }
}