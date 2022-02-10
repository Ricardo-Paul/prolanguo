"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapterFactory = void 0;
const SQLite = require("react-native-sqlite-storage");
const prolanguo_sqlite_adapter_1 = require("@prolanguo/prolanguo-sqlite-adapter");
class AdapterFactory {
    createAdapters() {
        const sqliteDatabase = new prolanguo_sqlite_adapter_1.SqliteDatabaseAdapter(SQLite);
        return {
            sqliteDatabase
        };
    }
}
exports.AdapterFactory = AdapterFactory;
;
