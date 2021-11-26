import { Knex } from "knex";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { resolveEnv } from "../utils/resolveEnv";
import { VocabularyModel } from "../models/VocabularyModel";
import { SetBuilder } from "@prolanguo/prolanguo-common/builders";
import { SetModel } from "../models/SetModel";

// tasks: make sure multiple vocabularies are upserted correctly;
describe('Test vocabulary model', () => {
  let vocabularyModel = new VocabularyModel();
  let setModel = new SetModel();
  let userId = "random UserID"
  // should we connect to db first?
  describe('tests start with db connected', () => {
    let databaseFacade: DatabaseFacade;
    let shardDb: Knex
    let env = resolveEnv();

    beforeEach(() => {
      databaseFacade = new DatabaseFacade(
        env.AUTH_DATABASE_CONFIG,
        env.ALL_SHARD_DATABASE_CONFIG,
        env.SHARD_DATABASE_PREFIX_NAME
      );

      shardDb = databaseFacade.getDb(env.ALL_SHARD_DATABASE_CONFIG[0].shardId);
    });

    afterEach(async () => {
      await shardDb.destroy();
    });

    describe('test starts after inserting sets in the db', async () => {
      let setList = new Array(2).fill(null).map((_, index) => {
        return new SetBuilder().build({
          setName: 'Advanced English' + index,
        });
      });

      await shardDb.transaction(async (tx) => {
        await setModel.upsertSets(
          tx, 
          userId,
          setList
        )
      });
    });
  })
})