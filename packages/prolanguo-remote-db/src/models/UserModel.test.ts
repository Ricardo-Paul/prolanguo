import { UserModel } from "./UserModel";
import { DatabaseFacade } from "../facades/DatabaseFacade";
import { Knex } from "knex";
import { resolveEnv } from "../utils/resolveEnv";
import { UserBuilder } from "@prolanguo/prolanguo-common/builders";
import * as short from "short-uuid";
import { UserExtraDataName, UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";
import { assertExists } from "../utils/assertExists";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { User } from "@prolanguo/prolanguo-common/interfaces";

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
          await userModel.insertUser(tx,
            user,
            password,
            accessKey,
            shardId
          );
      });
    });

    describe('tests start after inserting user with extra data', () => {
      const password = "extradatapass";
      const accessKey = short.generate();
      const shardId = env.ALL_SHARD_DATABASE_CONFIG[0].shardId;

      const userWithExtraData = new UserBuilder().build({
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

      beforeEach(async () => {
        await authDb.transaction(async (tx): Promise<void> => {
          await Promise.all([
            userModel.insertUser(
              tx,
              userWithExtraData,
              password,
              accessKey,
              shardId
            )
          ])
        })
      });

      // test('get user by email', async () => {
      //   const fetchedUser = await userModel.getUserByEmail(authDb, userWithExtraData.email);

      //   const { 
      //     user: userCoreData,
      //     accessKey: fetchedAccessKey,
      //     password: fetchedPassword,
      //     shardId: fetchedShardId
      //    } = assertExists(fetchedUser);

      //   // TODO: deal with testing date
      //   expect(userCoreData).toEqual({
      //     ...userWithExtraData,
      //     createdAt: expect.any(Date),
      //     updatedAt: expect.any(Date),
      //     firstSyncedAt: expect.any(Date),
      //     lastSyncedAt: expect.any(Date),
      //     membership: UserMembership.REGULAR,
      //     extraData: userWithExtraData.extraData.map((extraDataItem) => {
      //       return {
      //         ...extraDataItem,
      //         createdAt: expect.any(Date),
      //         updatedAt: expect.any(Date),
      //         firstSyncedAt: expect.any(Date),
      //         lastSyncedAt: expect.any(Date),
      //         dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
      //         dataValue: {
      //           globalAutoArchiveEnabled: true,
      //           spaceRepetitionLevelThreshold: 10,
      //           writingLevelThreshold: 10
      //         }
      //       }
      //     })
      //   });

      //   expect(fetchedAccessKey).toEqual(accessKey);
      //   expect(fetchedPassword).toEqual(password);
      //   expect(fetchedShardId).toEqual(shardId);
      // });

      // test("get user by id and access key", async () => {
      //   const fetchedUser = await userModel.getUserByIdAndAcessKey(
      //     authDb, 
      //     userWithExtraData.userId,
      //     accessKey,
      //     true
      //  );

      //   const { 
      //     user: userCoreData,
      //     accessKey: fetchedAccessKey,
      //     password: fetchedPassword,
      //     shardId: fetchedShardId
      //    } = assertExists(fetchedUser);

      //   console.log("fetchedUser by id and accesskey", fetchedUser);

      //   // TODO: deal with testing date
      //   expect(userCoreData).toEqual({
      //     ...userWithExtraData,
      //     createdAt: expect.any(Date),
      //     updatedAt: expect.any(Date),
      //     firstSyncedAt: expect.any(Date),
      //     lastSyncedAt: expect.any(Date),
      //     membership: UserMembership.REGULAR,
      //     extraData: userWithExtraData.extraData.map((extraDataItem) => {
      //       return {
      //         ...extraDataItem,
      //         createdAt: expect.any(Date),
      //         updatedAt: expect.any(Date),
      //         firstSyncedAt: expect.any(Date),
      //         lastSyncedAt: expect.any(Date),
      //         dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
      //         dataValue: {
      //           globalAutoArchiveEnabled: true,
      //           spaceRepetitionLevelThreshold: 10,
      //           writingLevelThreshold: 10
      //         }
      //       }
      //     })
      //   });

      //   expect(fetchedAccessKey).toEqual(accessKey);
      //   expect(fetchedPassword).toEqual(password);
      //   expect(fetchedShardId).toEqual(shardId);
      // })

      // test("test email exists", async () => {
      //   const exists = await userModel.emailExists(authDb, userWithExtraData.email);
      //   expect(exists).toBe(true);
      // })

      test("test update user", async () => {
        const editedUser: DeepPartial<User> = new UserBuilder().build({
          ...userWithExtraData,
          userStatus: UserStatus.DISABLED,
          extraData:[{
            dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
            dataValue: {
              globalAutoArchiveEnabled: true,
              spaceRepetitionLevelThreshold: 5,
              writingLevelThreshold: 5
            }
          }]
        });

        await authDb.transaction(async (tx) => {
          const u = await userModel.updateUser(
            tx,
            editedUser,
            password,
            accessKey
          );
          return u
        });


      })

    });

  });

});