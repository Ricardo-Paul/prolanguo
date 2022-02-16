import { ApiController } from "./ApiController";
import { UploadVocabulariesRequest, UploadVocabulariesResponse } from "@prolanguo/prolanguo-common/interfaces";
import { ControllerOptions } from "../../interfaces/ControllerOptions";
import { ApiRequest } from "../ApiRequest";
import { ApiResponse } from "../ApiResponse";
import { AuthenticationStrategy } from "@prolanguo/prolanguo-common/dist/enums";
import { DatabaseFacade, SetModel, VocabularyModel } from "@prolanguo/prolanguo-remote-db";
import * as _ from "lodash";
import { assertExists } from "../../utils/assertExists";

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
        }
    }
    public handleRequest(req: ApiRequest<UploadVocabulariesRequest>, res: ApiResponse<UploadVocabulariesResponse>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const { vocabularyList, vocabularySetIdPairs } = req.body;
            const userId = req.user.userId;
            const shardDb = this.database.getDb(req.userShardId);

            // goal is to first remove Vocabulary items with potentially non-existed setIds
            const vocabularyIdSetIdMap = _.fromPairs(vocabularySetIdPairs);

            const { existingSetIds } = await shardDb.transaction(tx => {
                this.setModel.getExistingSetIds(tx, userId,
                    vocabularySetIdPairs.map(([, setId]): string => setId)
                )
            });

            const invalidVocabularyIds = vocabularySetIdPairs.filter(
                ([_, setId]): boolean => {
                    return !_.includes(existingSetIds, setId as any)
                }
            );

            const validVocabularyList = vocabularyList.filter((vocabulary): boolean => {
                return !_.includes(invalidVocabularyIds, vocabulary.vocabularyId as any)
            });

            // only then can we store to remote db
            await shardDb.transaction(tx => {
                this.vocabularyModel.upsertMultipleVocabulary(
                    tx,
                    userId,
                    validVocabularyList.map((vocabluary) => {
                        return [vocabluary, vocabularyIdSetIdMap[assertExists(vocabluary.vocabularyId)]]
                    })
                )
            });

            res.json({
                acknowledged: validVocabularyList.map(
                    vocabulary => assertExists(vocabulary.vocabularyId))
            })
        })
    }
}