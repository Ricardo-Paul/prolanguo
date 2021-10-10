import { Knex } from "knex"
import { Set } from "@prolanguo/prolanguo-common/interfaces";
import { promisifyQuery } from "./PromisifyQuery";
import { SetRowPreparer } from "../preparers/SetRowPreparer";
import { TableName } from "../enums/tableName";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetStatus } from "@prolanguo/prolanguo-common/dist/enums";
import moment = require("moment");


// remove after testing
import * as dotenv from "dotenv";
import * as path from "path";
import { UserModel } from "./UserModel";

export class SetModel{
  private setRowPreparer: SetRowPreparer;

  constructor(){
    this.setRowPreparer = new SetRowPreparer();
  }

  public async upsertSets(db: Knex, userId: string, sets: Set[]): Promise<void> {
    console.log("upsertSet is running")
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          console.log("sets length :", sets.length)
          if(sets.length > 0){
            queries.push(
              this.insertOrIgnoreSets(
                db,
                userId,
                sets // send only validated sets
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
  };

  private async insertOrIgnoreSets(db: Knex, userId: string, sets: Set[]): Promise<void> {
    console.log("insert or ignore sets running ")
    return new Promise(
      async (resolve, reject): Promise<void> => {
        try{
          const queries = [];
          // prepare each set for insertion
            const setRows = sets.map(
              (set): Set => {
                return this.setRowPreparer.prepareInsert(set, userId);
              }
            );

            console.log("sets received :", sets);
            console.log("set rows :", setRows);

            const {sql, bindings} = db
              .insert(setRows)
              .into(TableName.SET)
              .toSQL();
            
            const replaceSql = sql.replace('insert', 'insert ignore');
            console.log("SQL line run :", replaceSql);

            // bulk insert all rows
            queries.push(
              await promisifyQuery(
                db.raw(
                  replaceSql, bindings
                )
              )
            );

            await Promise.all(queries);
            resolve()
        }catch(error){
          reject(error)
        }
      }
    );
  }
}

// unit test in
dotenv.config({
  path: path.resolve(".env")
});

const env = resolveEnv()
const database = new DatabaseFacade(
  env.AUTH_DATABASE_CONFIG,
  env.ALL_SHARD_DATABASE_CONFIG,
  env.SHARD_DATABASE_PREFIX_NAME
);

database.checkShardDatabaseTalbes();
const shardDb = database.getDb(env.ALL_SHARD_DATABASE_CONFIG[0].shardId);
const authDb = database.getDb('auth');
const setModel = new SetModel();

async function addSets(){
  console.log("add set running")
  await setModel.upsertSets(shardDb,"usr id", [
    {
      userId: "id",
      setId: "set id",
      setName: "Learn English",
      setStatus: SetStatus.ACTIVE,
      learningLanguageCode: "en",
      translatedLanguageCode: "en",
      createdAt: moment.utc().toDate(),
      updatedAt: moment.utc().toDate(),
      updatedStatusAt: moment.utc().toDate(),
      firstSyncedAt: moment.utc().toDate(),
      lastSyncedAt: moment.utc().toDate(),
      extraData: []
    },
  ] ).then(async () => {
    await shardDb.destroy()
  });

  const u = await new UserModel().getUserByEmail(authDb, 'any@email').then(async () => {
    await authDb.destroy();
  })
  console.log("Fetched user", u);


  // await shardDb.transaction( async (tx) => {
  //   return await setModel.upsertSets(tx, 
  //     'randomUserId',
  //     [
  //       {
  //         userId: "id",
  //         setId: "set id",
  //         setName: "Learn English",
  //         setStatus: SetStatus.ACTIVE,
  //         learningLanguageCode: "en",
  //         translatedLanguageCode: "en",
  //         createdAt: moment.utc().toDate(),
  //         updatedAt: moment.utc().toDate(),
  //         updatedStatusAt: moment.utc().toDate(),
  //         firstSyncedAt: moment.utc().toDate(),
  //         lastSyncedAt: moment.utc().toDate(),
  //         extraData: []
  //       },
  //       {
  //         userId: "id",
  //         setId: "set id2",
  //         setName: "Learn Spanish",
  //         setStatus: SetStatus.ARCHIVED,
  //         learningLanguageCode: "sp",
  //         translatedLanguageCode: "sp",
  //         createdAt: moment.utc().toDate(),
  //         updatedAt: moment.utc().toDate(),
  //         updatedStatusAt: moment.utc().toDate(),
  //         firstSyncedAt: moment.utc().toDate(),
  //         lastSyncedAt: moment.utc().toDate(),
  //         extraData: []
  //       }
  //     ]
  //    )
  // })
}

addSets();
