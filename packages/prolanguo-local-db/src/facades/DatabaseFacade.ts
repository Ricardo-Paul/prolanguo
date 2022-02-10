import { SqliteDatabase, SqliteDatabaseAdapter } from "@prolanguo/prolanguo-sqlite-adapter";

export class DatabaseFacade{
    private userDb!: SqliteDatabase;
    private databaseAdapter: SqliteDatabaseAdapter;

    constructor(
        databaseAdapter: SqliteDatabaseAdapter
    ){
        this.databaseAdapter = databaseAdapter;
    };

    public connectUserDb(databaseFilePath: string): Promise<void>{
        return new Promise(async (resolve, reject) => {
            try{
                console.log("(DatabaseFacade) connecting it user db...");
                this.userDb = this.databaseAdapter.createDatabase();
                await this.userDb.open(databaseFilePath, {
                    enable_foreign_key_support: true
            });
                // run other journal_mode pragma statement
                resolve()
            } catch(error){
                reject(error)
            }
        })
    }
};