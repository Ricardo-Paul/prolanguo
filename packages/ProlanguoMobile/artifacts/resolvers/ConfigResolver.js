"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigResolver = void 0;
const prolanguo_resolver_1 = require("@prolanguo/prolanguo-resolver");
const joi_1 = require("joi");
class ConfigResolver extends prolanguo_resolver_1.AbstractResolver {
    constructor() {
        super(...arguments);
        // TODO: use MappedRules type in parent class to get intellisense
        this.rules = {
            styles: {
                darkPrimaryColor: joi_1.default.string(),
                primaryColor: joi_1.default.string(),
            }
        };
    }
}
exports.ConfigResolver = ConfigResolver;
