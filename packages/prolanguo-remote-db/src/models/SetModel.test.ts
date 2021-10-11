import { SetExtraDataName, SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetModel } from "./SetModel";
import { SetBuilder } from "@prolanguo/prolanguo-common/builders";
import { SetExtraDataItemBuilder } from "@prolanguo/prolanguo-common/builders";


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
      databaseFacade.checkShardDatabaseTables()
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
      const setList = new Array(3)
      .fill(null)
      .map((_, index) => {
        return new SetBuilder().build({
          setName: "Learn German",
          setStatus: SetStatus.ACTIVE,
          learningLanguageCode: "gm",
          translatedLanguageCode: "gm",
          extraData: [
            new SetExtraDataItemBuilder().build({
              dataName: SetExtraDataName.SPACED_REPETITION_MAX_LIMIT,
              dataValue: 2
            })
          ]
        })
      })
      await setModel.upsertSets(shardDb,"usr id", setList);
      // TODO: write expected output
    });

    test("returns complete sets (set + extradata) with set ids", async () => {
      await setModel.getSetsByIds(shardDb, ['set id', 'set id2'], 'usr id');
      // TODO: write expected output
    });

    test("returns existing setIds", async () => {
      const {existingSetIds: fetchedExistingSetIds} = await setModel.getExistingSetIds(
        shardDb,
        'usr id',
        ['set id', 'set id2']
      );

      console.log("fetched set ids", fetchedExistingSetIds);
      // TODO: write expected output
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

      console.log("set list by sync time", setList);
      // TODO: write expected output
    })

  });
});