import { Knex } from "knex"
import { TableName } from "../enums/tableName";
import { UserRowPreparer } from "../preparers/UserRowPreparer";
import { UserExtraDataModel } from "./UserExtraDataModel";
import { User } from "../interfaces/User";
import { promisifyQuery } from "./PromisifyQuery";


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

        // inserting regular user data
        queries.push(promisifyQuery(
          db.insert(userRow).into(TableName.USER)
        ));

        
        // will insert an array of extra data
        queries.push(
          this.userExtraDataModel.upsertMultipleExtraData(
            db,
            user.extraData,
            user.userId
          )
        );

        console.log('Extra data received :', user.extraData);
        console.log("Prepared User Row for Insert :", userRow);
        
        await Promise.all(queries);
        resolve()
      }catch(err){
        reject(err)
      }
    })
  }
}
