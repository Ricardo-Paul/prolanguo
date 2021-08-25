import { ApiController } from "./ApiController";
import { SignUpRequest } from "@prolang/prolang-common/interfaces";
import * as Joi from "joi";

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



class SignUpRequestResolver{
  protected rules: any; // add type annotation to rules
  constructor(passwordMinLength: number){
    this.rules = {
      query: Joi.string().strip(),
      body: {
        email: Joi.string().email(),
        password: Joi.string().min(passwordMinLength)
      }
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
  public async handleRequest(req: any, res: any): Promise<void>{
      return new Promise((resolve, reject) => {
        try{
          console.log(`Capture values from ${req}`)
          console.log(`Doing async stuff with the DB`)
          console.log(`Returning a response`);
          res.send({
            resonpse: "Response returned"
          })
          resolve();
        } catch(err){
          reject(err)
        }
      })
  }

}