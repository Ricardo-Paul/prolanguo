import { Knex } from "knex"
import { TableName } from "../enums/tableName";
import { UserRowPreparer } from "../preparers/UserRowPreparer";
import { UserExtraDataModel } from "./UserExtraDataModel";
import { UserRow } from "../interfaces/User"; //import from common
import { User } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { UserRowResolver } from "../resolvers/UserRowResolver";
import * as _ from "lodash";

// TODO: move this function to an outer package
// remove its duplicate from server
export function assertExists<T>(value: T, message?: string): NonNullable<T>{
  if(value !== null && typeof value !== undefined){
    return value as NonNullable<T>
  } else {
    throw Error(
      message? message : "Assert (user model) value exits but is actually null/undefined"
    );
  }
};

export class UserModel {
  private userRowPreparer: UserRowPreparer;
  private userExtraDataModel: UserExtraDataModel;
  private userRowResolver: UserRowResolver;

  constructor(){
    this.userRowPreparer = new UserRowPreparer();
    this.userExtraDataModel = new UserExtraDataModel();
    this.userRowResolver = new UserRowResolver();
  }

  public async emailExists(db: Knex | Knex.Transaction, email: string){
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

  public async getUserByIdAndAcessKey(db: Knex, userId: string, accessKey: string, stripUnknown: boolean): Promise< null | {
    user: User,
    shardId: number,
    accessKey: string,
    password: string
  }>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.select()
            .from(TableName.USER)
            .where({
              userId,
              accessKey
            }).limit(1)
          );

          const first = _.first(result);
          console.log("retrieved by access key", first);

          if(typeof first === "undefined"){
            resolve(null)
          }else{
            const userRow = this.userRowResolver.resolve(first, stripUnknown);
            const user = await this.getCompleteUserByUserRow(db, userRow);
            resolve({
              user,
              shardId: userRow.shardId,
              accessKey: userRow.accessKey,
              password: userRow.password
            });
          }
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async getUserIdByEmail(db: Knex, email: string): Promise<null | string> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.select('userId')
            .from(TableName.USER)
            .where({
              email
            }).limit(1)
          );
  
          const first = _.first(result);
          
          if(typeof first === "undefined"){
            resolve(null)
          } else {
            const userRow = this.userRowResolver.resolvePartial(first, true);
            const userId = assertExists(userRow.userId,
              "User Id cannot be null or undefined"
            );
            resolve(userId);
          };
        } catch(error){
          reject(error)
        };
      }
    )
  }

  public async getLatestUpdatedTime(db: Knex, userId: string): Promise<null | Date> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.select('updatedAt')
              .from(TableName.USER)
              .where({ userId })
              .limit(1)
          );
          const first = _.first(result);
          if(typeof first === "undefined"){
            resolve(null)
          } else {
            const userRow = this.userRowResolver.resolvePartial(first, true);
            const { updatedAt } = userRow;
            resolve(
              assertExists(updatedAt,
                "updatedAt cannot be null or undefined"
                )
            );
          };
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async getLatestSyncTime(db: Knex, userId: string): Promise<null | Date>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.select('lastSyncedAt')
              .from(TableName.USER)
              .where({ userId })
              .limit(1)
          );
          const first = _.first(result);
          if(typeof first === "undefined"){
            resolve(null);
          } else {
            const userRow = this.userRowResolver.resolvePartial(first, true);
            const { lastSyncedAt } = userRow;
            resolve(assertExists(
              lastSyncedAt,
              "lastSyncedAt cannot be null or undefined"
            ));
          }
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public getUserById(db: Knex, userId: string): Promise<{
    user: User,
    shardId: number,
    password: string,
    accessKey: string
  } | null> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
            const result = await db.select().from(TableName.USER).where({ userId }).limit(1);
            if(_.first(result) === undefined){
              resolve(null)
            } else {
              const userRow = this.userRowResolver.resolve(_.first(result), true);
              const user = await this.getCompleteUserByUserRow(db, userRow)

              resolve({
                user,
                shardId: userRow.shardId,
                password: userRow.password,
                accessKey: userRow.accessKey
              })
            }
        }catch(error){
          reject(error)
        }
      }
    );
  };

  public async getUserByEmail(db: Knex | Knex.Transaction, email: string): Promise<{
    user: User,
    shardId: number,
    password: string,
    accessKey: string
  } | null> {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const result = await promisifyQuery(
            db.select().from(TableName.USER).where({ email }).limit(1)
          );
          if(_.first(result) === undefined){
            resolve(null)
          } else {
            const userRow = this.userRowResolver.resolve(_.first(result), true);
            const user = await this.getCompleteUserByUserRow(db, userRow);
            resolve({
              user,
              shardId: userRow.shardId,
              password: userRow.password,
              accessKey: userRow.accessKey
            })
          }
        }catch(error){
          reject(error)
        }
      }
    );
  }

  public async getCompleteUserByUserRow(db: Knex | Knex.Transaction, userRow: UserRow ): Promise<User>{
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

  public async insertUser(db: Knex, user: User, password: string, accessKey: string, shardId: number): Promise<void>{
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
        queries.push(await promisifyQuery(
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
        
        await Promise.all(queries);
        resolve()
      }catch(err){
        reject(err)
      }
    })
  };

  // set user type as DeepPartial<User> to make keys optional
  public async updateUser(
    db: Knex,
    user: any, //DeepPartial<User>
    password: string,
    accessKey: string
  ): Promise<void>{
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries: Promise<void>[] = [];
          const userRow = this.userRowPreparer.prepareUpdate(user, password, accessKey);
          const fieldsToUpdate = _.omit(userRow, 'userId');
          const userId = assertExists(userRow.userId);
          // update basic user fields
          if(Object.keys(fieldsToUpdate).length > 0){
            queries.push(
              await promisifyQuery(
                db.update(fieldsToUpdate)
                .from(TableName.USER)
                .where({userId})
              )
            )
          }

        // will update an array of extra data
        if(user.extraData.length > 0){
          queries.push(
            this.userExtraDataModel.upsertMultipleExtraData(
              db,
              user.extraData,
              user.userId
            )
          );
        }

          await Promise.all(queries);
          resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }
}
