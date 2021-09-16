import { Knex } from "knex";
import { UserExtraDataRowPreparer } from "../preparers/UserExtraDataRowPreparer";
import { UserExtraDataRowForUpsert } from "../interfaces/UserExtraDataRowForUpsert";
import { TableName } from "../enums/tableName";


interface UserExtraDataRow {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: Date;
  lastSyncedAt: Date;
}

function promisifyQuery(query: Knex.QueryBuilder | Knex.Raw): Promise<void>{
  return new Promise((resolve, reject) => {
    query.then(resolve, reject)
  })
}

export class UserExtraDataModel{
  private userExtraDataRowPreparer: UserExtraDataRowPreparer;
  constructor(){
    this.userExtraDataRowPreparer = new UserExtraDataRowPreparer()
  }

  public upsertMultipleExtraData(db: Knex, userExtraData: any, userId: string): Promise<void> {
    return new Promise( async (resolve, reject) => {
      try{
        const queries: Promise<void>[] = [];

        const userExtraDataRows = userExtraData.map((row: UserExtraDataRow): UserExtraDataRowForUpsert => {
          return this.userExtraDataRowPreparer.prepareUpsert(row, userId)
        });
    
        const { sql, bindings } = db.insert(userExtraDataRows).into(TableName.USER_EXTRA_DATA).toSQL();
        
        console.log('Rows for upsert :', userExtraDataRows);
        console.log('SQL to insert :', sql, bindings);

        // insert operation
        // queries.push(promisifyQuery(
        //   db.raw(sql.replace('insert', 'insert ignore'), bindings)
        // ));

        // update operation
        
        // await Promise.all(queries);
      }catch(err){
        reject(err)
      }
    })
  }
}
