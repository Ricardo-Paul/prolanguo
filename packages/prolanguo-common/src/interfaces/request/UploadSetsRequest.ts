import { Set } from "../general/Set";
import { DeepPartial } from "../../extended-types/DeepPartial";

export interface UploadSetsRequest{
    readonly path: '/upload-sets',
    readonly method: "post",
    readonly authRequired: true,
    readonly query: null,
    readonly body: {
        readonly setList: DeepPartial<Set>[]
    }
};