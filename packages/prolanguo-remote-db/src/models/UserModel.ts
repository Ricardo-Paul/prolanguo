import { Knex } from "knex"
import { TableName } from "../enums/tableName";
import { UserRowValidator } from "../preparers/UserRowValidator";
import * as Joi from "joi";

function promisifyQuery(query: Knex.QueryBuilder | Knex.Raw): Promise<any> {
  return new Promise((resolve, reject): void=> {
    query.then(resolve, reject)
  })
}

export class UserModel {
  private userRowValidator: UserRowValidator;

  constructor(){
    this.userRowValidator = new UserRowValidator()
  }

  public emailExists(db: Knex | Knex.Transaction, email: string){
    return new Promise(async (resolve, reject) => {
      try{
        const result = await promisifyQuery(
          db
          .select()
          .from(TableName.USER)
          .where({ email })
          .limit(1)
        );

        console.log("Result from the database...", result, result[0]);
        if(typeof result[0] === "undefined"){
          resolve(false)
        } else {
          resolve(true)
        }

      }catch(err){
        reject(err)
      }
    })
  }

  public insertUser(db: Knex, user: object, password: string, accessKey: string, shardId: number): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try{
        const queries: Promise<void>[] = [];

        // type annotations
        const { email, userId, userStatus } = user;
        const userRow = this.userRowValidator.validateInsertRow()

        console.log("PREPARED USER ROW :", userRow);

        // const insertUserQuery = db.insert(userRow).into("prolanguo_user")
        // queries.push(promisifyQuery(insertUserQuery));

        // not executing promises for testing purpose
        // await Promise.all(queries).then(() => {
        //   console.log(`Row inserted into prolanguo_user (UserModel.ts)`)
        // })
        resolve()
      }catch(err){
        reject(err)
      }
    })
  }
}
