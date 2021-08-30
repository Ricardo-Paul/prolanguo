import { ApiController } from "./ApiController";
import { SignUpRequest } from "@prolanguo/prolanguo-common/interfaces";
import * as Joi from "joi";
import { RequestResolver } from "../ApiRequest";

enum UserMemberShip {
  REGULAR = 'REGULAR',
  LIFETIME_PREMIUM = 'LIFETIME_PREMIUM',
  SUBSCRIBED_PREMIUM = 'SUBSCRIBED_PREMIUM'
}

enum UserStatus{
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

interface User{
  readonly userId: string;
  readonly email: string;
  readonly userStatus: UserStatus;
  readonly membership: UserMemberShip;
  readonly membershipExpiredAt: null | Date;
  readonly updatedAt: Date;
  readonly createdAt: Date;
  readonly firstSyncedAt: Date | null;
  readonly lastSyncedAt: Date | null;
  // readonly extraData: readonly UserExtraDataItem[]; //to implement
}

interface SignUpResponse{
  readonly currentUser: User;
  readonly accessToken: string;
}

class SignUpRequestResolver extends RequestResolver<SignUpRequest>{
  protected rules: any; // override abstractResolver rules
  constructor(passwordMinLength: number){
    super();
    this.rules = {
      // query: Joi.string().strip(),
      body: {
        email: Joi.string().email(),
        password: Joi.string().min(passwordMinLength),
      },
      mytestObject: "Hey tesing here"
    }
  }
}

export class SignUpController extends ApiController<SignUpRequest, SignUpResponse>{
  // TODO: add type annotations to options()
  public options(): any{
    return {
      paths: ['/sign-up'],
      allowedMethod: 'post',
      authStrategies: null,
      requestResolver: new SignUpRequestResolver(8)
    }
  }

  // TODO: add type annotation to req and res
  public async handleRequest(req: any, res: any): Promise<void> {
      return new Promise((resolve, reject) => {
        try{
          console.log("Request body from signup", req.body)
          res.json({
            message: "Json API implemented"
          })
          // res.json() is not a function
          // we are using our own instance - ApiRequest - instead of the express req object
          resolve();
        } catch(err){
          reject(err)
        }
      })
  }
}