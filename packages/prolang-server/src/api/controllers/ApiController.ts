import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { Request } from "@prolang/prolang-common/interfaces";

// the ApiController class is all about providing a base shape for Api controllers:
// Api Controllers should all define the functions options and handleRequest

// the type parameters are used to indicate the shape of the arguments, req and res
export abstract class ApiController<R extends Request, P extends object> {
  // TODO: add type annotations for options
  public abstract options(): any
  public abstract handleRequest(req: ApiRequest<R>, res: ApiResponse<P>): Promise<void>;
}