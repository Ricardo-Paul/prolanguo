import * as Joi from "joi";
import * as _ from "lodash";
import { UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";
import { UserRow, UserRowForUpdate } from "../interfaces/User";
import { AbstractPreparer } from "./AbstractPreparer";
import { User } from "@prolanguo/prolanguo-common/interfaces";

export class UserRowPreparer extends AbstractPreparer<UserRow> {
  insertRules = {
    userId: Joi.string(),
    shardId: Joi.number(),
    password: Joi.string(),
    accessKey: Joi.string(),
    email: Joi.string(),
    userStatus: Joi.string().valid(..._.values(UserStatus)),

    membership: Joi.string().valid(..._.values(UserMembership)),
    membershipExpiredAt: Joi.date().allow(null),

    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    firstSyncedAt: Joi
      .forbidden()
      .strip()
      .optional(),
    lastSyncedAt: Joi
      .forbidden()
      .strip()
      .optional()
  }

  // difference 1: all is optional
  // difference 2: shardId and synced pairs are forbidden
  // should be undefined
  updateRules = {
    userId: Joi.string().optional(),
    shardId: Joi.forbidden().strip()
    .optional(),
    password: Joi.string().optional(),
    accessKey: Joi.string().optional(),
    email: Joi.string().optional(),
    userStatus: Joi.string().valid(..._.values(UserStatus)).optional(),

    membership: Joi.string().valid(..._.values(UserMembership)).optional(),
    membershipExpiredAt: Joi.date().allow(null).optional(),

    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    firstSyncedAt: Joi
      .forbidden()
      .strip()
      .optional(),
    lastSyncedAt: Joi
      .forbidden()
      .strip()
      .optional()
  }

  public prepareInsert(
    user: User, 
    shardId: number, 
    password: string, 
    accessKey: string
    ){

    // not include createdAt and sync pairs
    const userRowForInsert = {
      userId: user.userId,
      shardId,
      email: user.email,
      password,
      accessKey,
      userStatus: user.userStatus,
      membership: user.membership,
      membershipExpiredAt: user.membershipExpiredAt
    }

    return this.validateData(userRowForInsert, Joi.object(this.insertRules));
  };

  public prepareUpdate(
    user: Partial<User>,
    newPassword: string | undefined,
    newAccessKey: string | undefined
  ): UserRowForUpdate{
    const userRowForUpdate = {
      userId: user.userId,
      shardId: undefined,
      email: user.email,
      password: newPassword,
      accessKey: newAccessKey,
      userStatus: user.userStatus,
      membership: user.membership,
      membershipExpiredAt: user.membershipExpiredAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      firstSyncedAt: undefined,
      lastSyncedAt: undefined
    };

    // remove fields with undefined
    return _.omitBy(
      this.validateData(userRowForUpdate, Joi.object(this.updateRules)),
      _.isUndefined
    )
  }
}