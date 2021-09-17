import { Knex } from "knex";
import { UserExtraDataRowPreparer } from "../preparers/UserExtraDataRowPreparer";
import { UserExtraDataRowForUpsert } from "../interfaces/UserExtraDataRowForUpsert";
import * as _ from "lodash";
import { TableName } from "../enums/tableName";
import { promisifyQuery } from "./PromisifyQuery";
import { UserExtraDataRowResolver } from "../resolvers/UserExtraDataRowResolver";


interface UserExtraDataRow {
  userId: string;
  dataName: string;
  dataValue: string;
  createdAt: Date;
  updatedAt: Date;
  firstSyncedAt: Date;
  lastSyncedAt: Date;
}

export class UserExtraDataModel{
  private userExtraDataRowPreparer: UserExtraDataRowPreparer;
  private userExtraDataRowResolver: UserExtraDataRowResolver;
  constructor(){
    this.userExtraDataRowPreparer = new UserExtraDataRowPreparer();
    this.userExtraDataRowResolver = new UserExtraDataRowResolver();
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

        // insert extra data array in bulk
        queries.push(promisifyQuery(
          db.raw(sql.replace('insert', 'insert ignore'), bindings)
        ));

        // update each row except userId and dataName
        const userExtraDataRowUpdateQueries = userExtraDataRows.map((row: any) => {
          const { userId, dataName } = row;
          const fieldsToUpdate = _.omit(row, ['userId', 'dataName']);
          return promisifyQuery(
            db.update(fieldsToUpdate).from(TableName.USER_EXTRA_DATA).where({ userId, dataName })
          )
        });

        queries.push(...userExtraDataRowUpdateQueries);
        
        await Promise.all(queries);
        resolve()
      }catch(err){
        reject(err)
      }
    })
  };

  public getUserExtraDataById(db: Knex, userId: string){
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db
            .select()
            .from(TableName.USER_EXTRA_DATA)
            .where({
              userId
            })
          );

          if(result !== undefined){
            const userExtraDataRows = this.userExtraDataRowResolver.resolveArray(result, true)
            console.log('Resolved ARRRAYY userExtradatarows:', userExtraDataRows);
            
            resolve({
              result
            })
          };
        }catch(error){
          reject(error)
        }
      }
    );
  }
};
