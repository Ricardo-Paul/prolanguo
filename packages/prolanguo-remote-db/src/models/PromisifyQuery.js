"use strict";
exports.__esModule = true;
exports.promisifyQuery = void 0;
function promisifyQuery(query) {
    return new Promise(function (resolve, reject) {
        query.then(resolve, reject);
    });
}
exports.promisifyQuery = promisifyQuery;
;
