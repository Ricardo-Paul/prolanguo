import * as Joi from "joi";
import * as _ from "lodash";
import { UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";
import { User } from "../interfaces/User";

type Rules<T> = { [P in keyof T]: Joi.SchemaLike }

abstract class AbstractPreparer<T> {
  protected insertRules?: Rules<T>;
  protected upsertRules?: Rules<T>;
  protected updateRules?: Rules<T>;

  protected validateData(data: any, rules: Joi.ObjectSchema){
    const { value, error } = rules.validate(data, {
      stripUnknown: true,
      presence: "required"
    });
    if(error){
      throw error
    } else {
      return value
    }
  }
}

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
    firstSyncedAt: Joi.date()
      .forbidden()
      .strip()
      .optional(),
    lastSyncedAt: Joi.date()
      .forbidden()
      .strip()
      .optional()
  }

  // TODO: user type annotation
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

    const v = _.values(UserMembership);
    console.log("VALUES LODASH :", ...v);
    return this.validateData(userRowForInsert, Joi.object(this.insertRules));
  }
}