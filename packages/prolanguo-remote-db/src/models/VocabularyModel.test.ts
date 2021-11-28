import { SetExtraDataName, SetStatus } from "@prolanguo/prolanguo-common/enums";
import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { SetModel } from "./SetModel";
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

    test("tests vocabulary model", async () => {
      const vocabularySetIdPairs = new Array(1).fill(null).map(
          (index, _): [Vocabulary, string] => {
            return [
              new VocabularyBuilder().build({
                vocabularyText: "UDP",
                lastLearnedAt: moment.utc().toDate(),
                definitions: [
                  new DefinitionBuilder().build({
                    meaning: "User Datagram Protocol",
                    createdAt: moment.utc().toDate(),
                    updatedAt: moment.utc().toDate()
                  })
                ]
              }),
              '00a64a41-165f-41ac-a140-a070e85e635f'
            ]
          }
        );

        await shardDb.transaction(async (tx) => {
          await new VocabularyModel().upsertMultipleVocabulary(tx, 'usr id', vocabularySetIdPairs);
        });
    });

  });
});