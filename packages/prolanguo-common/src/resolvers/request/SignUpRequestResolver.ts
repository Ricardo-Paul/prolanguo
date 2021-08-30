import * as Joi from "joi";
import { SignUpRequest } from "../../interfaces/request/SignUpRequest";
import { RequestResolver } from "./RequestResolver";

export class SignUpRequestResolver extends RequestResolver<SignUpRequest>{
  protected rules: any; // override abstractResolver rules
  constructor(passwordMinLength: number){
    super();
    this.rules = {
      // query: Joi.string().strip(),
      body: {
        email: Joi.string().email(),
        password: Joi.string().min(passwordMinLength)
      }
    }
  }
}