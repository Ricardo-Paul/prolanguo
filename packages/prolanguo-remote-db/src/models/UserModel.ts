import * as knex from "knex";
import { TableName } from "../enums/tableName";

function promisifyQuery(query: knex.Knex.QueryBuilder | knex.Knex.Raw): Promise<any>{
  return new Promise((resolve, reject): void=> {
    query.then(resolve, reject)
  })
}

export class UserModel {
  public emailExists(db: knex.Knex | knex.Knex.Transaction, email: string){
    return new Promise(async (resolve, reject) => {
      try{
        const result = await promisifyQuery(
          db
          .select()
          .from(TableName.USER)
          .where({ email })
          .limit(1)
        ); 

        console.log("Result from DB ", result);
        resolve(result)
      }catch(err){
        reject(err)
      }
    })
  }
}