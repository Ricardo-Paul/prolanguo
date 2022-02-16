import { Request } from "./Request";
import { DeepPartial, ReadonlyTuplerOrNot } from "../../extended-types";
import { Vocabulary } from "./../general/Vocabulary";


export interface UploadVocabulariesRequest extends Request{
    path: "/upload-vocabularies";
    method: 'post';
    authRequired: true;
    query: null;
    body: {
        vocabularyList: readonly DeepPartial<Vocabulary>[], 
        vocabularySetIdPairs: ReadonlyTuplerOrNot<string, string>
    }
}
