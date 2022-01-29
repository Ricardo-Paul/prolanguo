import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import Joi from "joi";
import { Config } from "../interfaces/Config";

export class ConfigResolver extends AbstractResolver<Config> {
    // TODO: use MappedRules type in parent class to get intellisense
    protected rules = {
        styles: {
            darkPrimaryColor: Joi.string(),
            primaryColor: Joi.string(),
        }
    };
}