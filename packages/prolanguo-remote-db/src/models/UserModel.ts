import { Knex } from "knex"
import { TableName } from "../enums/tableName";
import { UserRowPreparer } from "../preparers/UserRowPreparer";
import { UserExtraDataModel } from "./UserExtraDataModel";
import { User } from "../interfaces/User";

function promisifyQuery(query: Knex.QueryBuilder | Knex.Raw): Promise<any> {
  return new Promise((resolve, reject): void=> {
    query.then(resolve, reject)
  })
}

export class UserModel {
  private userRowPreparer: UserRowPreparer;
  private userExtraDataModel: UserExtraDataModel;

  constructor(){
    this.userRowPreparer = new UserRowPreparer();
    this.userExtraDataModel = new UserExtraDataModel();
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

  public insertUser(db: Knex, user: User, password: string, accessKey: string, shardId: number): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try{
        const queries: Promise<void>[] = [];
        const userRow = this.userRowPreparer.prepareInsert(
          user,
          shardId,
          password,
          accessKey
        );

        // queries.push(promisifyQuery(
        //   db.insert(userRow).into(TableName.USER)
        // ));

        console.log('Extra data received :', user.extraData);
        
        queries.push(
          this.userExtraDataModel.upsertMultipleExtraData(
            db,
            user.extraData,
            user.userId
          )
        );

        console.log("Prepared User Row for Insert :", userRow);

        resolve()
      }catch(err){
        reject(err)
      }
    })
  }
}
