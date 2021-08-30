import { AbstractResolver } from "@prolanguo/prolanguo-resolver/"
import { Request } from "../../interfaces/request/Request"

export abstract class RequestResolver<T extends Request> extends AbstractResolver<Pick<T, 'query' | 'body'>>{}
