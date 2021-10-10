"use strict";
exports.__esModule = true;
exports.TableName = void 0;
var TableName;
(function (TableName) {
    // table names for auth database
    TableName["AUTH_DB_INFO"] = "prolanguo_auth_db_info";
    TableName["USER"] = "prolanguo_user";
    TableName["RESET_PASSWORD_REQUEST"] = "prolanguo_reset_password_request";
    TableName["USER_EXTRA_DATA"] = "prolanguo_user_extra_data";
    TableName["API_KEY"] = "prolanguo_api_key";
    TableName["PURCHASE"] = "prolanguo_purchase";
    // table names for shard database
    TableName["SHARD_DB_INFO"] = "prolanguo_shard_db_info";
    TableName["SET"] = "prolanguo_set";
    TableName["SET_EXTRA_DATA"] = "prolanguo_set_extra_data";
    TableName["VOCABULARY"] = "prolanguo_vocabulary";
    TableName["DEFINITION"] = "prolanguo_definition";
    TableName["VOCABULARY_CATEGORY"] = "prolanguo_vocabulary_category";
    TableName["VOCABULARY_WRITING"] = "prolanguo_vocabulary_writing";
    TableName["LESSON_RESULT"] = "prolanguo_lesson_result";
    TableName["LOCK"] = "prolanguo_lock";
})(TableName = exports.TableName || (exports.TableName = {}));
