import { ApiController } from "./ApiController";
import { UploadSetsRequest, UploadSetsResponse } from "@prolanguo/prolanguo-common/interfaces";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { UploadSetsRequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { AuthenticationStrategy } from "@prolanguo/prolanguo-common/enums";

export class UploadSetsController extends ApiController<UploadSetsRequest, UploadSetsResponse> {
    public options(): ControllerOptions<UploadSetsRequest> {
        return {
            paths: ["/upload-sets"],
            allowedMethod: 'post',
            authStrategies: [AuthenticationStrategy.ACCESS_TOKEN], // may need to add another auth strategy
            requestResolver: new UploadSetsRequestResolver()
        }
    }

    public handleRequest(req: ApiRequest<UploadSetsRequest>, res: ApiResponse<UploadSetsResponse>): Promise<void> {
        console.log("Request object :", req.isAuthenticated());
        return new Promise(async () => {
            
        })
    }
}