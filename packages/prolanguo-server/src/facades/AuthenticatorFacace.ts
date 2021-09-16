import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


export class AuthenticatorFacade {
  private jwtSecretKey: string;

  constructor(jwtSecretKey: string){
    this.jwtSecretKey = jwtSecretKey
  }

  public encryptPassword(password: string, saltRouds: number): Promise<string>{
    return bcrypt.hash(password, saltRouds);
  };

  public createAccessToken(userId: string, accessKey: string): string{
    return jwt.sign({ userId, accessKey }, this.jwtSecretKey)
  }
}