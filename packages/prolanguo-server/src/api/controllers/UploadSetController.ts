import { ApiController } from "./ApiController";
import { UploadSetsRequest, UploadSetsResponse } from "@prolanguo/prolanguo-common/interfaces";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { UploadSetsRequestResolver } from "@prolanguo/prolanguo-common/resolvers";

export class UploadSetController extends ApiController<UploadSetsRequest, UploadSetsResponse> {
    public options(): ControllerOptions<UploadSetsRequest> {
        return {
            paths: ['upload-sets'],
            allowedMethod: 'post',
            authStrategies: [],
            requestResolver: new UploadSetsRequestResolver()
        }
    }

    public handleRequest(req: ApiRequest<UploadSetsRequest>, res: ApiResponse<UploadSetsResponse>): Promise<void> {
        return new Promise(async () => {

        })
    }
}