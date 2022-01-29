"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigResolver = void 0;
const prolanguo_resolver_1 = require("@prolanguo/prolanguo-resolver");
const Joi = require("joi");
class ConfigResolver extends prolanguo_resolver_1.AbstractResolver {
    constructor() {
        super(...arguments);
        // TODO: use MappedRules type in parent class to get intellisense
        this.rules = {
            styles: {
                darkPrimaryColor: Joi.string(),
                primaryColor: Joi.string(),
            }
        };
    }
}
exports.ConfigResolver = ConfigResolver;
