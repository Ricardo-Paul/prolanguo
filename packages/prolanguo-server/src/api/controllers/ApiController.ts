import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { Request } from "@prolanguo/prolanguo-common/interfaces";
import { ControllerOptions } from "../../interfaces/ControllerOptions";


export abstract class ApiController<R extends Request, P extends object> {
  // TODO: add type annotations for options
  public abstract options(): ControllerOptions<R>
  public abstract handleRequest(req: ApiRequest<R>, res: ApiResponse<P>): Promise<void>;
}