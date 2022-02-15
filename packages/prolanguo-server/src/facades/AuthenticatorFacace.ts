import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as JWTpassport from "passport-jwt";
import * as passport from "passport";
import { AuthenticationStrategy } from "@prolanguo/prolanguo-common/enums";
import { AuthenticatedUser } from "../interfaces/AuthenticatedUser";
import { DatabaseFacade, UserModel } from "@prolanguo/prolanguo-remote-db";

export class AuthenticatorFacade {
  private jwtSecretKey: string;
  private userModel: UserModel;
  private database: DatabaseFacade;

  constructor(
    jwtSecretKey: string,
    userModel: UserModel,
    database: DatabaseFacade
    ){
    this.jwtSecretKey = jwtSecretKey;
    this.userModel = userModel;
    this.database = database;
  }

  public encryptPassword(password: string, saltRouds: number): Promise<string>{
    return bcrypt.hash(password, saltRouds);
  };

  public createAccessToken(userId: string, accessKey: string): string{
    return jwt.sign({ userId, accessKey }, this.jwtSecretKey)
  }

  public validatePassword(password: string, encryptedPassword: string){
    return bcrypt.compare(password, encryptedPassword);
  }

  public registerAuthenticationStrategies(){
    passport.use(
      AuthenticationStrategy.ACCESS_TOKEN,
      this.authenticateViaAccessTokenStrategy()
    )
  }

  private authenticateViaAccessTokenStrategy(): passport.Strategy {
    const options = {
      jwtFromRequest: JWTpassport.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:this.jwtSecretKey
    }
    return new JWTpassport.Strategy(options, async (payload, done) => {
      const decodedUser = await this.getAuthenticatedUserViaAccessTokenPayload(payload);

      if(decodedUser){
        done(null, decodedUser)
      } else {
        done(null, false)
      }

    })
  };

  private getAuthenticatedUserViaAccessTokenPayload(payload: {userId: string, accessKey: string}): Promise<null | AuthenticatedUser> {
    return new Promise(async (resolve, reject) => {
      try{
        const { userId, accessKey } = payload;
        const authDb = this.database.getDb('auth');
        const result = await this.userModel.getUserByIdAndAcessKey(
          authDb,
          userId,
          accessKey,
          true
        );
        if(result !== null){
          const { user, shardId, accessKey, password } = result;
          resolve({
            ...user,
            shardId,
            accessKey,
            encryptedPassword: password
          });
        };

      }catch(error){
        reject(error)
      }
    })
  }
}