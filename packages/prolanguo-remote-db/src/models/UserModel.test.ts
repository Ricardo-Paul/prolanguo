import { UserModel } from "./UserModel";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { Knex } from "knex";
import { resolveEnv } from "../utils/resolveEnv";
import { UserBuilder } from "@prolanguo/prolanguo-common/builders";
import * as short from "short-uuid";
import { UserExtraDataName } from "@prolanguo/prolanguo-common/dist/enums";

describe('Test UserModel', () => {
  const env = resolveEnv();
  test("Env var loads properly", () => {
    expect(env).toEqual({
      AUTH_DATABASE_CONFIG: expect.any(Object),
      ALL_SHARD_DATABASE_CONFIG: expect.any(Object),
      SHARD_DATABASE_PREFIX_NAME: expect.any(String)
    })
  })

  describe('test starts with db connected', () => {
    let databaseFacade: DatabaseFacade;
    let authDb: Knex;
    let userModel: UserModel;

    beforeEach(async () => {
      databaseFacade = new DatabaseFacade(
        env.AUTH_DATABASE_CONFIG,
        env.ALL_SHARD_DATABASE_CONFIG,
        env.SHARD_DATABASE_PREFIX_NAME
      );

      // use factory to create model
      userModel = new UserModel();
      authDb = databaseFacade.getDb('auth');
    });

    afterEach(async () => {
      // destroy all dbs here
      await authDb.destroy();
    });

    test("inserts user succesfully", async () => {
      const user = new UserBuilder().build({
        email: short.generate() + `@prolanguo.tes`
      });
      const accessKey = short.generate();
      const password = "mypassword";
      const shardId = env.ALL_SHARD_DATABASE_CONFIG[0].shardId;

      await authDb.transaction(async (tx) => {
          userModel.insertUser(tx,
            user,
            password,
            accessKey,
            shardId
          );
      });
    });

    describe('tests start after inserting user with extra data', async (): Promise<void> => {
      beforeEach(() => {
        const user = new UserBuilder().build({
          email: short.generate() + `@prolanguo.tes`,
          extraData:[{
            dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
            dataValue: {
              globalAutoArchiveEnabled: true,
              spaceRepetitionLevelThreshold: 10,
              writingLevelThreshold: 10
            }
          }]
        });
        
      })
    })

  });

});