import { SetExtraDataName, SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetModel } from "./SetModel";
import * as moment from "moment";
import { SetBuilder } from "@prolanguo/prolanguo-common/builders";
import { SetExtraDataItemBuilder } from "@prolanguo/prolanguo-common/builders";
import { uuid } from "short-uuid";


describe("Set Model", () => {
  const env = resolveEnv();

  describe("Tests start after connecting to db", () => {
    let databaseFacade: DatabaseFacade;
    let shardDb: Knex;
    let authDb: Knex;
    let shardId: number;
    const setModel = new SetModel();

    beforeEach(async () => {
      databaseFacade = new DatabaseFacade(
        env.AUTH_DATABASE_CONFIG,
        env.ALL_SHARD_DATABASE_CONFIG,
        env.SHARD_DATABASE_PREFIX_NAME
        );
        
      // correct tables spelling here
      databaseFacade.checkShardDatabaseTalbes()
      shardDb = databaseFacade.getDb(env.ALL_SHARD_DATABASE_CONFIG[0].shardId);
      authDb = databaseFacade.getDb('auth');
      shardId = env.ALL_SHARD_DATABASE_CONFIG[0].shardId;

    });

    afterEach(async () => {
      await shardDb.destroy();
      await authDb.destroy();
    });

    test("returns selected shard database", async () => {
      const schemaName = await 
        shardDb.select('SCHEMA_NAME')
        .from('INFORMATION_SCHEMA.SCHEMATA')
        .where({ SCHEMA_NAME: env.SHARD_DATABASE_PREFIX_NAME + shardId });
      // TODO: write expected output
      console.log("shardDb found", schemaName);
    });

    test("upserts set and extraData into set and set_extra_data table", async () => {


      // TODO: futher test, try to upsert extra data with different data names
      // the api won't re-insert many records with the same data name.

      const setList = new Array(3)
      .fill(null)
      .map((_, index) => {
        return {
          // userId: uuid.v4(),
          setId: "any set id",
          setName: "Learn German",
          setStatus: SetStatus.ACTIVE,
          learningLanguageCode: "gm",
          translatedLanguageCode: "gm",
          createdAt: moment.utc().toDate(),
          updatedAt: moment.utc().toDate(),
          updatedStatusAt: moment.utc().toDate(),
          firstSyncedAt: null,
          lastSyncedAt: null,
          extraData: [
            new SetExtraDataItemBuilder().build({
              dataName: SetExtraDataName.SPACED_REPETITION_MAX_LIMIT,
              dataValue: 2
            })
          ]
        };
      })

      await setModel.upsertSets(shardDb,"usr id", setList);
    });

    // TODO: build a setBuilder to create mock sets
    test("returns complete sets (set + extradata) with set ids", async () => {
      await setModel.getSetsByIds(shardDb, ['set id', 'set id2'], 'usr id');
    });

    test("returns existing setIds", async () => {
      const {existingSetIds: fetchedExistingSetIds} = await setModel.getExistingSetIds(
        shardDb,
        'usr id',
        ['set id', 'set id2']
      );

      console.log("fetched set ids", fetchedExistingSetIds);
    });

    test("returns latest sync time", async () => {
        await setModel.getLatestSyncTime(
        shardDb,
        'usr id'
      );
    });

    test("returns sets by last sync time", async () => {
      const {setList} = await setModel.getSetsByLastSyncTime(
        shardDb,
        'usr id',
        undefined,
        2
      );

      console.log("set list by sync time", setList)
    })

  });
});