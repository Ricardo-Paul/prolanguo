"use strict";
exports.__esModule = true;
exports.assertExists = void 0;
function assertExists(value, message) {
    if (value !== null && typeof value !== 'undefined') {
        return value;
    }
    else {
        throw new Error(message || "Assertion failed, value is in fact null/undefined");
    }
}
exports.assertExists = assertExists;
;
