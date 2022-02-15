import { RequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { Request } from "@prolanguo/prolanguo-common/interfaces";
import { AuthenticationStrategy } from "@prolanguo/prolanguo-common/enums";


interface BodyQueryNull {
  body: null;
  query: null;
}


export interface ControllerOptions<T extends Request> {
  paths: readonly T["path"][];
  allowedMethod: T["method"];
  authStrategies: T["authRequired"] extends true? readonly AuthenticationStrategy[] : null;
  // type should be a RequestResolver if query or body is present
  requestResolver: T extends BodyQueryNull? null:
  T extends { query: object } | { body: object } ?
   RequestResolver<T> :
   null | RequestResolver<T>
}