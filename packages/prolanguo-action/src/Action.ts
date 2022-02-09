import { ActionPayload } from "./ActionPayload";

export interface Action<T extends keyof ActionPayload>{
    readonly type: T;
    readonly payload: ActionPayload[T];
}