const SQLite = require("react-native-sqlite-storage");

import { SqliteDatabaseAdapter } from "@prolanguo/prolanguo-sqlite-adapter";

export class AdapterFactory{
    public createAdapters(){
        const sqliteDatabase = new SqliteDatabaseAdapter(SQLite);
        return {
            sqliteDatabase
        }
    }
};
