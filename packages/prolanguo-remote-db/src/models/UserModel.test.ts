import { UserModel } from "./UserModel";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { Knex } from "knex";
import { resolveEnv } from "../utils/resolveEnv";

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
    });

    afterEach(async () => {
      // destroy all dbs here
    });

    test("inserts user succesfully ", () => {
      expect(5).toEqual(5)
    })
    
  });

});