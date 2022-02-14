import { RequestResolver } from "./RequestResolver";
import { UploadSetsRequest } from "../../interfaces/request/UploadSetsRequest";
import * as Joi from "joi";
import { SetResolver } from "../general/SetResolver";


export class UploadSetsRequestResolver extends RequestResolver<UploadSetsRequest>{
    protected rules: any = {
        query: Joi.object().strip(),
        body: {
            setList: Joi.array().items(new SetResolver().getRules())
                    .options({
                        presence: "optional"
                    })
        }
    }
}