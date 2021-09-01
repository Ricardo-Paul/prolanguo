import { RequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { Request } from "@prolanguo/prolanguo-common/interfaces";

interface BodyQueryNull {
  body: null;
  query: null;
}

enum AuthenticationStrategies {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
  SYNC_API_KEY = 'SYNC_API_KEY'
}

export interface ControllerOptions<T extends Request> {
  paths: readonly T["path"][];
  allowedMethod: T["method"];
  authStrategies: T["authRequired"] extends true? readonly AuthenticationStrategies[] : null;
  // type should be a RequestResolver if query or body is present
  requestResolver: T extends BodyQueryNull? null:
  T extends { query: object } | { body: object } ?
   RequestResolver<T> :
   null | RequestResolver<T>
}