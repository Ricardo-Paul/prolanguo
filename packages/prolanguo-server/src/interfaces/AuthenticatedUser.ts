import { User } from "@prolanguo/prolanguo-common/interfaces";

export interface AuthenticatedUser extends User {
    shardId: number,
    encryptedPassword: string,
    accessKey: string
}