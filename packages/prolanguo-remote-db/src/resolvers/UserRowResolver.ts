import { UserStatus, UserMembership } from "@prolanguo/prolanguo-common/dist/enums";
import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import * as Joi from "joi";
import * as _ from "lodash";


interface UserInterface {

}

export class UserRowResolver extends AbstractResolver<UserInterface>{
  rules = {
    userId: Joi.string(),
    email: Joi.string(),
    userStatus: Joi.string().valid(..._.values(UserStatus)),
    shardId: Joi.number(),
    accessKey: Joi.string(),
    password: Joi.string(),
    membership: Joi.string().valid(..._.values(UserMembership)),
    membershipExpiredAt: Joi.date().allow(null),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstSyncedAt: Joi.date(),
    lastSyncedAt: Joi.date()
  }
}