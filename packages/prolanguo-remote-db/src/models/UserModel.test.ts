import { UserModel } from "./UserModel";
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
import { SetModel } from "./SetModel";
import moment = require("moment");
import { TableName } from "../enums/tableName";


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
    let user: User;

    let shardDb: Knex;

    beforeEach(async () => {
      databaseFacade = new DatabaseFacade(
        env.AUTH_DATABASE_CONFIG,
        env.ALL_SHARD_DATABASE_CONFIG,
        env.SHARD_DATABASE_PREFIX_NAME
      );
      databaseFacade.checkShardDatabaseTalbes();

      // use factory to create model
      userModel = new ModelFactory().createModel('userModel');
      authDb = databaseFacade.getDb('auth');
      shardDb = databaseFacade.getDb(env.ALL_SHARD_DATABASE_CONFIG[0].shardId);

    });

    afterEach(async () => {
      // destroy all dbs here
      await authDb.destroy();
      await shardDb.destroy();
    });

    test("inserts user succesfully", async () => {
      user = new UserBuilder().build({
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

    test("it pull shard db", async () => {

      console.log("set from shard db", await shardDb.table(TableName.USER).insert({
        name: "anyt thing"
      }));
    });

    test("test email exists", async () => {
      const exists = await userModel.emailExists(authDb, user.email);
      expect(exists).toBe(true);
    });

    test("get user id by email", async () => {
      const userId = await userModel.getUserIdByEmail(authDb, user.email);
      expect(userId).toEqual(user.userId);
    });

    test("get latest updated time", async() => {
      const latestUpdatedTime = await userModel.getLatestUpdatedTime(authDb, user.userId);
      expect(latestUpdatedTime).toEqual(expect.any(Date));
    });

    test("get latest sync time", async () => {
      const latestSyncTime = await userModel.getLatestSyncTime(authDb, user.userId);
      expect(latestSyncTime).toEqual(expect.any(Date));
    });

    describe('tests start after inserting user with extra data', () => {
      let password = "extradatapass";
      let accessKey = short.generate();
      let shardId = env.ALL_SHARD_DATABASE_CONFIG[0].shardId;
      let userWithExtraData: User;

      beforeEach(async () => {
        password = "ex"
        userWithExtraData = new UserBuilder().build({
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

      test('get user by email', async () => {
        const fetchedUser = await userModel.getUserByEmail(authDb, userWithExtraData.email);

        const { 
          user: userCoreData,
          accessKey: fetchedAccessKey,
          password: fetchedPassword,
          shardId: fetchedShardId
         } = assertExists(fetchedUser);

        // TODO: deal with testing date
        expect(userCoreData).toEqual({
          ...userWithExtraData,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          firstSyncedAt: expect.any(Date),
          lastSyncedAt: expect.any(Date),
          membership: UserMembership.REGULAR,
          extraData: userWithExtraData.extraData.map((extraDataItem) => {
            return {
              ...extraDataItem,
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
              firstSyncedAt: expect.any(Date),
              lastSyncedAt: expect.any(Date),
              dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
              dataValue: {
                globalAutoArchiveEnabled: true,
                spaceRepetitionLevelThreshold: 10,
                writingLevelThreshold: 10
              }
            }
          })
        });

        expect(fetchedAccessKey).toEqual(accessKey);
        expect(fetchedPassword).toEqual(password);
        expect(fetchedShardId).toEqual(shardId);
      });

      test("get user by id and access key", async () => {
        const fetchedUser = await userModel.getUserByIdAndAcessKey(
          authDb, 
          userWithExtraData.userId,
          accessKey,
          true
        );

        const { 
          user: userCoreData,
          accessKey: fetchedAccessKey,
          password: fetchedPassword,
          shardId: fetchedShardId
          } = assertExists(fetchedUser);

        console.log("fetchedUser by id and accesskey", fetchedUser);

        // TODO: deal with testing date
        expect(userCoreData).toEqual({
          ...userWithExtraData,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          firstSyncedAt: expect.any(Date),
          lastSyncedAt: expect.any(Date),
          membership: UserMembership.REGULAR,
          extraData: userWithExtraData.extraData.map((extraDataItem) => {
            return {
              ...extraDataItem,
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
              firstSyncedAt: expect.any(Date),
              lastSyncedAt: expect.any(Date),
              dataName: UserExtraDataName.GLOBAL_AUTO_ARCHIVE,
              dataValue: {
                globalAutoArchiveEnabled: true,
                spaceRepetitionLevelThreshold: 10,
                writingLevelThreshold: 10
              }
            }
          })
        });

        expect(fetchedAccessKey).toEqual(accessKey);
        expect(fetchedPassword).toEqual(password);
        expect(fetchedShardId).toEqual(shardId);
      })


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

        const fetchedUser = await userModel.getUserById(
          authDb,
          assertExists(editedUser.userId)
        );
        const { accessKey: fetchedAccessKey } = assertExists(fetchedUser);
        expect(fetchedAccessKey).toEqual(accessKey);
      });
      
    });

  });

});