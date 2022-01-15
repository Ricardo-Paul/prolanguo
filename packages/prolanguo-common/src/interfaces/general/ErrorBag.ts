import { ErrorCode } from "../../enums";

export interface ErroBag {
    errorCode: ErrorCode;
    error: unknown;
};