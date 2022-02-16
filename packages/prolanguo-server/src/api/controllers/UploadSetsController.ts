import { ApiController } from "./ApiController";
import { UploadSetsRequest, UploadSetsResponse } from "@prolanguo/prolanguo-common/interfaces";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { UploadSetsRequestResolver } from "@prolanguo/prolanguo-common/resolvers";
import { AuthenticationStrategy } from "@prolanguo/prolanguo-common/enums";
import { DatabaseFacade } from "@prolanguo/prolanguo-remote-db";
import { SetModel } from "@prolanguo/prolanguo-remote-db";
import { assertExists } from "@prolanguo/prolanguo-remote-db/dist/models/UserModel";

export class UploadSetsController extends ApiController<UploadSetsRequest, UploadSetsResponse> {
    private database: DatabaseFacade;
    private setModel: SetModel;

    constructor(
        database: DatabaseFacade,
        setModel: SetModel
    ){
        super();
        this.database = database,
        this.setModel = setModel
    };

    public options(): ControllerOptions<UploadSetsRequest> {
        return {
            paths: ["/upload-sets"],
            allowedMethod: 'post',
            authStrategies: [AuthenticationStrategy.ACCESS_TOKEN], // may need to add another auth strategy
            requestResolver: new UploadSetsRequestResolver()
        }
    }

    public handleRequest(req: ApiRequest<UploadSetsRequest>, res: ApiResponse<UploadSetsResponse>): Promise<void> {
        return new Promise(async () => {
            const { setList } = req.body;
            const userId = req.user.userId;

            //use userResolver in ApiRequest to remove warning
            const shardDb = this.database.getDb(req.userShardId);
            await shardDb.transaction(tx => {
                return this.setModel.upsertSets(tx, userId, setList)
            });

            // TODO: save latest sync time on firebase

            res.json({
                acknowledged: setList.map((set): string => assertExists(set.setId))
            })

        })
    }
}