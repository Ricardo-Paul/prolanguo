import { ActionPayload } from "./ActionPayload";

export interface Action<T extends keyof ActionPayload>{
    type: T;
    payload: ActionPayload[T];
}