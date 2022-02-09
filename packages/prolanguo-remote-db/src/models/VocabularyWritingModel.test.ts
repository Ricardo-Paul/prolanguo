import { SetExtraDataName, SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { VocabularyWritingBuilder } from "@prolanguo/prolanguo-common/builders";
import { ModelFactory } from "../factories/ModelFactory";
import { VocabularyWriting, Set, Vocabulary } from "@prolanguo/prolanguo-common/interfaces";
import moment = require("moment");

describe("Test Writing Model", () => {
  const env = resolveEnv();

  describe("Tests start after connecting to db", () => {
    let databaseFacade: DatabaseFacade;
    let shardDb: Knex;
    let authDb: Knex;
    let shardId: number;
    let modelFactory = new ModelFactory();
    const setModel = modelFactory.createModel('setModel');
    const vocabularyWritingModel = modelFactory.createModel('vocabularyWritingModel');

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

    test("upserts vocabulary writing properly", async () => {
      const writingAndVocabularyIdPairs = new Array(1)
        .fill(null)
        .map((index, _): [ VocabularyWriting, string ] => {
          return [
            new VocabularyWritingBuilder().build({
              level: 2
            }),
            '05ce99e6-d1b8-497e-b9ef-7fbbbe4e28c0' //insert a vocabulary for this purpose (hard coded vocabulary id)
          ]
        });
      await vocabularyWritingModel.upsertVocabularyWritings(shardDb, 'usr id', writingAndVocabularyIdPairs);
    });

    test("get vocabulary writings per vocabulary id", async () => {
      const vocabularyWritingsPerVocabularyId = await vocabularyWritingModel.getVocabularyWritingsByVocabularyIds(
        shardDb,
        'usr id',
        ['05ce99e6-d1b8-497e-b9ef-7fbbbe4e28c0']
      );

      console.log("Vocabulary writing :", vocabularyWritingsPerVocabularyId);
    });

  });
});