import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { ModelFactory } from "../factories/ModelFactory";
import { LessonResult } from "@prolanguo/prolanguo-common/interfaces";
import { LessonResultModel } from "./LessonResultModel";
import { LessonResultBuilder } from "@prolanguo/prolanguo-common/builders";
import * as moment from "moment";

describe("Test LessonResult Model", () => {
  const env = resolveEnv();

  describe("Tests start after connecting to db", () => {
    let databaseFacade: DatabaseFacade;
    let shardDb: Knex;
    let authDb: Knex;
    let shardId: number;

    beforeEach(async () => {
      databaseFacade = new DatabaseFacade(
        env.AUTH_DATABASE_CONFIG,
        env.ALL_SHARD_DATABASE_CONFIG,
        env.SHARD_DATABASE_PREFIX_NAME
        );
        
      databaseFacade.checkShardDatabaseTables()
      shardDb = databaseFacade.getDb(env.ALL_SHARD_DATABASE_CONFIG[0].shardId);
      authDb = databaseFacade.getDb('auth');
      shardId = env.ALL_SHARD_DATABASE_CONFIG[0].shardId;

    });

    afterEach(async () => {
      await shardDb.destroy();
      await authDb.destroy();
    });

    test("inserts or ignore multiple lesson results", async () => {
      const lessonResults: readonly LessonResult[] = new Array(4)
        .fill(null)
        .map((_, index): LessonResult => {
          return new LessonResultBuilder().build({
            totalCount: index,
            createdAt: moment()
              .add(index, 'days')
              .toDate()
          })
        });

      await shardDb.transaction(async (tx) => {
        await new LessonResultModel().insertOrIgnoreLessonResults(
          tx,
          'usr id',
          lessonResults
        )
      });
    });

    test("get heat map data", async () => {
      const heatMapData = await new LessonResultModel().getHeatMapData(
        shardDb,
        'usr id',
        [moment().toDate(), 
        moment().add(9, 'days').toDate()]
      );

      console.log(heatMapData);
    });

  });
});