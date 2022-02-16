import { RequestResolver } from "..";
import { UploadVocabulariesRequest } from "../../interfaces/request/UploadVocabulariesRequest";
import * as Joi from "joi";
import { VocabularyResolver } from "../general/VocabularyResolver";

// NOTE: not funcional yet, need to add rules for resolving Definitions, Writing and Category in VocabularyResolver
export class UploadVocabularyRequestResolver extends RequestResolver<UploadVocabulariesRequest>{
    protected rules: any = {
        query: Joi.object().strip(),
        body: {
            vocabularyList: Joi.array().items(new VocabularyResolver().getRules())
        }
    }
}