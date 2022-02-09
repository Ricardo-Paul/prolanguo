import { Action } from "./Action";
import { ActionPayload } from "./ActionPayload";

export function createAction<T extends keyof ActionPayload>(
    type: T,
    payload: ActionPayload[T]
): Action<T>{
    return {
        type,
        payload
    }
};

