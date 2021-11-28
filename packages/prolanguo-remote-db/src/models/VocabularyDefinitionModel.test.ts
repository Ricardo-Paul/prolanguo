import { SetExtraDataName, SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetBuilder, VocabularyBuilder, DefinitionBuilder } from "@prolanguo/prolanguo-common/builders";
import { ModelFactory } from "../factories/ModelFactory";
import { Set, Vocabulary } from "@prolanguo/prolanguo-common/interfaces";
import { VocabularyModel } from "./VocabularyModel";
import moment = require("moment");

describe("Set Model", () => {
  const env = resolveEnv();

  describe("Tests start after connecting to db", () => {
    let databaseFacade: DatabaseFacade;
    let shardDb: Knex;
    let authDb: Knex;
    let shardId: number;
    let modelFactory = new ModelFactory();
    const setModel = modelFactory.createModel('setModel');
    const vocabularyDefinitionModel = modelFactory.createModel('vocabularyDefinitionModel');

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

    test("get definitions per vocabulary ids", async () => {
      const { definitionsPerVocabularyIds } = await vocabularyDefinitionModel.getDefinitionsByVocabularyIds(
        shardDb,
        'usr id',
        ['c12b17cc-bcb4-45dc-bf54-7448dd6e3981', '6b01e70b-e16c-4fcd-a852-5989aa04de52'] //create vocabularies and remove hardcoded values
      );

      console.log("Definitions :", definitionsPerVocabularyIds);
    });
  });
});