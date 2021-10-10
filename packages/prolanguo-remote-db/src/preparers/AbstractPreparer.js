"use strict";
//move this to somewhere else
exports.__esModule = true;
exports.AbstractPreparer = void 0;
var AbstractPreparer = /** @class */ (function () {
    function AbstractPreparer() {
    }
    AbstractPreparer.prototype.validateData = function (data, rules) {
        var _a = rules.validate(data, {
            stripUnknown: true,
            presence: "required"
        }), value = _a.value, error = _a.error;
        if (error) {
            throw error;
        }
        else {
            return value;
        }
    };
    ;
    AbstractPreparer.prototype.isDataValid = function (data, rules) {
        var error = rules.validate(data, {
            stripUnknown: true,
            presence: "required"
        }).error;
        return error === undefined;
    };
    ;
    return AbstractPreparer;
}());
exports.AbstractPreparer = AbstractPreparer;
;
