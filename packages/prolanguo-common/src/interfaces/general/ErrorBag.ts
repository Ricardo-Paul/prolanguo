import { ErrorCode } from "../../enums";

export interface ErrorBag {
    errorCode: ErrorCode;
    error: unknown;
};