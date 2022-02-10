import { ConnectionOptions } from "../react-native/ReactNativeSqliteDatabase";

export interface Result {
    rows: ReadonlyArray<any>
}

export abstract class SqliteDatabase{
    abstract open(name: string, options?: ConnectionOptions): Promise<void>
    abstract executeSql(statement: string, params?: any[]): Promise<Result>
};