import { AbstractResolver } from "@prolanguo/prolanguo-resolver";
import * as Joi from "joi";

interface UserExtraData {

}

export class UserExtraDataRowResolver extends AbstractResolver<UserExtraData> {
  rules = {
    userId: Joi.string()
  }
}