import { SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetModel } from "./SetModel";
import * as moment from "moment";

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

    test("it returns selected shard database", async () => {
      const schemaName = await 
        shardDb.select('SCHEMA_NAME')
        .from('INFORMATION_SCHEMA.SCHEMATA')
        .where({ SCHEMA_NAME: env.SHARD_DATABASE_PREFIX_NAME + shardId });
      // TODO: write expect line
      console.log("shardDb found", schemaName);
    });

    test("it upserts data into set table", async () => {

      // TODO: build a setBuilder to create mock sets
      await setModel.upsertSets(shardDb,"usr id", [
        {
          userId: "id2",
          setId: "set id2",
          setName: "Learn English",
          setStatus: SetStatus.DELETED,
          learningLanguageCode: "en",
          translatedLanguageCode: "en",
          createdAt: moment.utc().toDate(),
          updatedAt: moment.utc().toDate(),
          updatedStatusAt: moment.utc().toDate(),
          firstSyncedAt: moment.utc().toDate(),
          lastSyncedAt: moment.utc().toDate(),
          extraData: []
        },
      ]);
    });


  });
});