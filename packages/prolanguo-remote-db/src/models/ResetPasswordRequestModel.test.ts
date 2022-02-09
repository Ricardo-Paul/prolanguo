import { ResetPasswordRequestModel } from "./ResetPasswordRequestModel";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { Knex } from "knex";
import { resolveEnv } from "../utils/resolveEnv";
import { UserBuilder } from "@prolanguo/prolanguo-common/builders";
import * as short from "short-uuid";
import { SetStatus, UserExtraDataName, UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";
import { assertExists } from "../utils/assertExists";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { User } from "@prolanguo/prolanguo-common/interfaces";
import { ModelFactory } from "../factories/ModelFactory";
import moment = require("moment");
import { TableName } from "../enums/tableName";

describe('Test Reset Password Request Model', () => {
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
    let user: User;
    let shardDb: Knex;

    beforeEach(async () => {
      databaseFacade = new DatabaseFacade(
        env.AUTH_DATABASE_CONFIG,
        env.ALL_SHARD_DATABASE_CONFIG,
        env.SHARD_DATABASE_PREFIX_NAME
      );
      databaseFacade.checkShardDatabaseTables();

      // use factory to create model
      authDb = databaseFacade.getDb('auth');
      shardDb = databaseFacade.getDb(env.ALL_SHARD_DATABASE_CONFIG[0].shardId);
    });

    afterEach(async () => {
      // destroy all dbs here
      await authDb.destroy();
      await shardDb.destroy();
    });

    test("upsert reset password request ", async () => {
      await new ResetPasswordRequestModel().upsertRequestPasswordReset(
        authDb,
        {
          userId:'074af367-080f-4908-beb8-01428f32e8b5',
          resetPasswordKey: 'mypasswordresetkey'
        },
        1
      );
    });

    test("make sure password reset request is valid", async () => {
      const isRequestValid = await new ResetPasswordRequestModel().isPasswordResetRequestValid(
        authDb,
        {
          userId:'074af367-080f-4908-beb8-01428f32e8b5',
          resetPasswordKey: 'mypasswordresetkey'
        },
      );
      expect(isRequestValid).toBeBoolean();
    });

    test("delete reset password request", async () => {
      await new ResetPasswordRequestModel().deleteResetPasswordRequest(
        authDb,
        '074af367-080f-4908-beb8-01428f32e8b5'
      )
    });

  });
});