import { SqliteDatabase, SqliteDatabaseAdapter } from "@prolanguo/prolanguo-sqlite-adapter";

export class DatabaseFacade {
  private userDb!: SqliteDatabase;
  private sharedDb!: SqliteDatabase;
  private databaseAdapter: SqliteDatabaseAdapter;

  constructor(
    databaseAdapter: SqliteDatabaseAdapter
  ) {
    this.databaseAdapter = databaseAdapter;
  };

  public connectUserDb(databaseFileName: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.userDb = this.databaseAdapter.createDatabase();
        await this.userDb.open(databaseFileName, {
          enable_foreign_key_support: true
        });
        // run journal_mode pragma statement
        resolve();
      } catch (error) {
        reject(error)
      }
    })
  };

  public connectSharedDb(databaseFileName: string): Promise<void>{
    return new Promise(async(resolve, reject) => {
      try{
        this.sharedDb = this.databaseAdapter.createDatabase();
        await this.sharedDb.open(databaseFileName, {
          enable_foreign_key_support: true
        });
        // run journal_mode pragma statement
        resolve();
      }catch(error){
        reject(error)
      }
    })
  }
};