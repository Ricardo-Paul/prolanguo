import { ApiController } from "./ApiController";
import { UploadVocabulariesRequest, UploadVocabulariesResponse } from "@prolanguo/prolanguo-common/interfaces";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { AuthenticationStrategy } from "@prolanguo/prolanguo-common/dist/enums";
import { DatabaseFacade, SetModel, VocabularyModel } from "@prolanguo/prolanguo-remote-db";
import * as _ from "lodash";
import { assertExists } from "../../utils/assertExists";
import { RequestResolverStatus } from "../../enums/RequestResolverStatus";

export class UploadVocabulariesController extends ApiController<UploadVocabulariesRequest, UploadVocabulariesResponse>{
    private database: DatabaseFacade;
    private setModel: SetModel;
    private vocabularyModel: VocabularyModel;
    
    constructor(
        database: DatabaseFacade,
        setModel: SetModel,
        vocabularyModel: VocabularyModel
    ){
        super();
        this.database = database;
        this.setModel = setModel;
        this.vocabularyModel = vocabularyModel;
    }

    public options(): ControllerOptions<UploadVocabulariesRequest> {
        return {
            paths: ["/upload-vocabularies"],
            allowedMethod: "post",
            authStrategies: [AuthenticationStrategy.ACCESS_TOKEN],
            requestResolver: RequestResolverStatus.OMITTED
        }
    }
    public async handleRequest(
        req: ApiRequest<UploadVocabulariesRequest>, 
        res: ApiResponse<UploadVocabulariesResponse>
    ): Promise<void> {
            const { vocabularyList, vocabularySetIdPairs } = req.body;

            const userId = req.user.userId;
            const shardDb = this.database.getDb(req.userShardId);

            // goal is to first remove Vocabulary items with potentially non-existed setIds
            const vocabularyIdSetIdMap = _.fromPairs(vocabularySetIdPairs);
            console.log("Logging map from pairs :", vocabularyIdSetIdMap);

            const { existingSetIds } = await this.setModel.getExistingSetIds(shardDb, userId,
                vocabularySetIdPairs.map(([_, setId]): string => setId)
            );

            console.log("Find existing setIds? ", existingSetIds);

            const invalidVocabularyIds = vocabularySetIdPairs.filter(
                ([_, setId]): boolean => {
                    return !_.includes(existingSetIds as any, setId as any)
                }
            );

            const validVocabularyList = vocabularyList.filter((vocabulary): boolean => {
                return !_.includes(invalidVocabularyIds, vocabulary.vocabularyId as any)
            });

            console.log("Logging valid vocabularies :", validVocabularyList);

            // only then can we store to remote db
            await shardDb.transaction(async tx => {
                await this.vocabularyModel.upsertMultipleVocabulary(
                    tx,
                    userId,
                    validVocabularyList.map((vocabluary) => {
                        console.log("Setid for vocabulary :", vocabularyIdSetIdMap[assertExists(vocabluary.vocabularyId)]);
                        return [vocabluary, vocabularyIdSetIdMap[assertExists(vocabluary.vocabularyId)]]
                    })
                )
            });

            // TODO: save latest sync time on firebase

            res.json({
                acknowledged: validVocabularyList.map(
                  vocabulary => assertExists(vocabulary.vocabularyId))
            })
    }
}