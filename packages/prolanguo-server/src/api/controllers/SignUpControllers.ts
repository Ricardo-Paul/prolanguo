import { ApiController } from "./ApiController";
import { SignUpRequest } from "@prolanguo/prolanguo-common/interfaces";
import { SignUpRequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { ApiRequest } from "../ApiRequest";

// database stuff
import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";
import { ApiResponse } from "../ApiResponse";

enum UserMemberShip {
  REGULAR = 'REGULAR',
  LIFETIME_PREMIUM = 'LIFETIME_PREMIUM',
  SUBSCRIBED_PREMIUM = 'SUBSCRIBED_PREMIUM'
}

enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

interface User {
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

interface SignUpResponse {
  readonly currentUser: User;
  readonly accessToken: string;
}

export class SignUpController extends ApiController<SignUpRequest, SignUpResponse> {

  private database: DatabaseFacade;
  private userModel: UserModel;

  constructor(database: DatabaseFacade, userModel: UserModel){
    super()
    this.database = database;
    this.userModel = userModel;
  }

  public options(): ControllerOptions<SignUpRequest> {
    return {
      paths: ['/sign-up'],
      allowedMethod: 'post',
      authStrategies: null,
      requestResolver: new SignUpRequestResolver(8)
    }
  }

  // TODO: add type annotation to req and res
  public async handleRequest(req: ApiRequest<SignUpRequest>, res: ApiResponse<SignUpResponse>): Promise<void> {
    console.log("Handling signup request")
    const db = this.database.getDb("auth");
    // const { email, password } = req.body;
    const email = "ricardopaul459@gmail.com"

    const response = db.transaction(tx => {
      return new Promise(async (resolve, reject) => {
        try{
          const r = await this.userModel.emailExists(tx, email);
          console.log("User with email ", r)

        }catch(err){
          reject(err)
        }
      })
    })

    console.log("Transaction response :", response)

    res.json({
      accessToken: "any access token",
      currentUser: {}
    })
  }
}

// Next: write emailExists method for UserModel
// Write a password encryptor
// Write a method to get random Shard Id
// Write insert user method