import * as Joi from "joi";
import * as _ from "lodash";
import { UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";
import { User } from "../interfaces/User";
import { AbstractPreparer } from "./AbstractPreparer";


interface UserRow{
  readonly userId: string;
  readonly shardId: number;
  readonly email: string;
  readonly password: string;
  readonly accessKey: string;
  readonly userStatus: UserStatus;

  readonly membership: UserMembership;
  readonly membershipExpiredAt: null | Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstSyncedAt: Date;
  readonly lastSyncedAt: Date;
}


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
  }
}