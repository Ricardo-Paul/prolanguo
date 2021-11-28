import { SetExtraDataName, SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { VocabularyCategoryBuilder } from "@prolanguo/prolanguo-common/builders";
import { ModelFactory } from "../factories/ModelFactory";
import { Category, Set, Vocabulary } from "@prolanguo/prolanguo-common/interfaces";
import { VocabularyModel } from "./VocabularyModel";
import moment = require("moment");

describe("Test Category Model", () => {
  const env = resolveEnv();

  describe("Tests start after connecting to db", () => {
    let databaseFacade: DatabaseFacade;
    let shardDb: Knex;
    let authDb: Knex;
    let shardId: number;
    let modelFactory = new ModelFactory();
    const setModel = modelFactory.createModel('setModel');
    const vocabuaryCategoryModel = modelFactory.createModel('vocabularyCategoryModel');

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

    describe

    test("upserts category properly", async () => {
      const categoryAndVocabularyIdPairs = new Array(1)
        .fill(null)
        .map((index, _): [ Category, string ] => {
          return [
            new VocabularyCategoryBuilder().build({
              categoryName: 'Load Balancer'
            }),
            '05ce99e6-d1b8-497e-b9ef-7fbbbe4e28c0' //insert a vocabulary for this purpose
          ]
        });
      await vocabuaryCategoryModel.upsertVocabularyCategories(shardDb, 'usr id', categoryAndVocabularyIdPairs)
    })

    test("retrieve categories using vocabulary ids", async () => {
      const categoriesPerVocabularyIds = await vocabuaryCategoryModel.getCategoriesByVocabularyIds(
        shardDb,
        'usr id',
        ['05ce99e6-d1b8-497e-b9ef-7fbbbe4e28c0']
      );

      console.log("Category retrieved :", categoriesPerVocabularyIds)
    });
  });
});