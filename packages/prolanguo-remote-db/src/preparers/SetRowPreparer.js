"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.SetRowPreparer = void 0;
var AbstractPreparer_1 = require("./AbstractPreparer");
var Joi = require("joi");
var enums_1 = require("@prolanguo/prolanguo-common/enums");
var _ = require("lodash");
var SetRowPreparer = /** @class */ (function (_super) {
    __extends(SetRowPreparer, _super);
    function SetRowPreparer() {
        var _a, _b;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.insertRules = {
            userId: Joi.string(),
            setId: Joi.string(),
            setName: Joi.string(),
            setStatus: (_a = Joi.string()).valid.apply(_a, _.values(enums_1.SetStatus)),
            learningLanguageCode: Joi.string(),
            translatedLanguageCode: Joi.string(),
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            updatedStatusAt: Joi.date(),
            // may as well remove these lines
            // leave them for compliance with SetRow interface
            firstSyncedAt: Joi.forbidden().strip().optional(),
            lastSyncedAt: Joi.forbidden().strip().optional()
        };
        _this.updateRules = {
            userId: Joi.string(),
            setId: Joi.string(),
            setName: Joi.string().optional(),
            setStatus: (_b = Joi.string()).valid.apply(_b, _.values(enums_1.SetStatus)).optional(),
            learningLanguageCode: Joi.string().optional(),
            translatedLanguageCode: Joi.string().optional(),
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),
            updatedStatusAt: Joi.date(),
            // may as well remove these lines
            // leave them for compliance with SetRow interface
            firstSyncedAt: Joi.forbidden().strip().optional(),
            lastSyncedAt: Joi.forbidden().strip().optional()
        };
        return _this;
    }
    SetRowPreparer.prototype.prepareInsert = function (set, userId) {
        var setRow = this.convertToInsertRow(set, userId);
        return this.validateData(setRow, Joi.object(this.insertRules));
    };
    SetRowPreparer.prototype.prepareUpdate = function (set, userId) {
        var setRow = this.convertToUpdateRow(set, userId);
        return this.validateData(setRow, Joi.object(this.updateRules));
    };
    SetRowPreparer.prototype.canBeInserted = function (set, userId) {
        var setRow = this.convertToInsertRow(set, userId);
        return this.isDataValid(setRow, Joi.object(this.insertRules));
    };
    ;
    SetRowPreparer.prototype.convertToUpdateRow = function (set, userId) {
        var setId = set.setId, setName = set.setName, setStatus = set.setStatus, learningLanguageCode = set.learningLanguageCode, translatedLanguageCode = set.translatedLanguageCode, createdAt = set.createdAt, updatedAt = set.updatedAt, updatedStatusAt = set.updatedStatusAt;
        return {
            userId: userId,
            setId: setId,
            setName: setName,
            setStatus: setStatus,
            learningLanguageCode: learningLanguageCode,
            translatedLanguageCode: translatedLanguageCode,
            createdAt: createdAt,
            updatedAt: updatedAt,
            updatedStatusAt: updatedStatusAt
        };
    };
    SetRowPreparer.prototype.convertToInsertRow = function (set, userId) {
        var setId = set.setId, setName = set.setName, setStatus = set.setStatus, learningLanguageCode = set.learningLanguageCode, translatedLanguageCode = set.translatedLanguageCode, createdAt = set.createdAt, updatedAt = set.updatedAt, updatedStatusAt = set.updatedStatusAt;
        return {
            userId: userId,
            setId: setId,
            setName: setName,
            setStatus: setStatus,
            learningLanguageCode: learningLanguageCode,
            translatedLanguageCode: translatedLanguageCode,
            createdAt: createdAt,
            updatedAt: updatedAt,
            updatedStatusAt: updatedStatusAt
        };
    };
    return SetRowPreparer;
}(AbstractPreparer_1.AbstractPreparer));
exports.SetRowPreparer = SetRowPreparer;
