import * as Joi from "joi";
import { UserMembership, UserStatus } from "@prolanguo/prolanguo-common/enums";

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

export class UserRowValidator extends AbstractPreparer<UserRow> {
  insertRules = {
    userId: Joi.string(),
    shardId: Joi.number(),
    email: Joi.string(),
    password: Joi.string(),
    accessKey: Joi.string(),
    userStatus: Joi.string(),

    membership: Joi.string(),
    membershipExpiredAt: Joi.date(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstSyncedAt: Joi.date(),
    lastSyncedAt: Joi.date()
  }

  // TODO: user type annotation
  public validateInsertRow(user, shardId: number, password: string, accessKey: string){
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