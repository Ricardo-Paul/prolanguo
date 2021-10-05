import { Knex } from "knex"
import { TableName } from "../enums/tableName";
import { UserRowPreparer } from "../preparers/UserRowPreparer";
import { UserExtraDataModel } from "./UserExtraDataModel";
import { UserRow } from "../interfaces/User"; //import from common
import { User } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { UserRowResolver } from "../resolvers/UserRowResolver";
import * as _ from "lodash";

export class UserModel {
  private userRowPreparer: UserRowPreparer;
  private userExtraDataModel: UserExtraDataModel;
  private userRowResolver: UserRowResolver;

  constructor(){
    this.userRowPreparer = new UserRowPreparer();
    this.userExtraDataModel = new UserExtraDataModel();
    this.userRowResolver = new UserRowResolver();
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
  };

  public getUserById(db: Knex, userId: string): Promise<User | null> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
            const result = await db.select().from(TableName.USER).where({ userId }).limit(1);
            if(_.first(result) === undefined){
              resolve(null)
            } else {
              const userRow = this.userRowResolver.resolve(_.first(result), true);
              const user = await this.getCompleteUserByUserRow(db, userRow)
              // const user = await this.userExtraDataModel.getUserExtraDataById(db, userRow.userId);
              console.log("FOUND USER :", result);
              console.log("RESOLVED ROW ::::", userRow);
              console.log("WILL BE COMPLETE USER :", user);

              resolve(user)
            }
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async  getCompleteUserByUserRow(db: Knex, userRow: UserRow ): Promise<User>{
    console.log('CALLING getCompleteUserByUserRow ...');
    
    const {
      extraData
    } = await this.userExtraDataModel.getUserExtraDataById(
      db, userRow.userId
    );

    const user: User = {
      userId: userRow.userId,
      email: userRow.email,
      userStatus: userRow.userStatus,
      createdAt: userRow.createdAt,
      updatedAt: userRow.updatedAt,
      membership: userRow.membership,
      membershipExpiredAt: userRow.membershipExpiredAt,
      firstSyncedAt: userRow.firstSyncedAt,
      lastSyncedAt: userRow.lastSyncedAt,
      extraData
    }

    return user
  };

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
        if(user.extraData.length > 0){
          queries.push(
            this.userExtraDataModel.upsertMultipleExtraData(
              db,
              user.extraData,
              user.userId
            )
          );
        }

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
