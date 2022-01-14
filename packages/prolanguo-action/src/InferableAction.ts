import { Action } from "./Action";
import { ActionPayload } from "./ActionPayload";

export class InferableAction implements Action<any> {
    public type: string;
    public payload: null | object;

    constructor(type: string, payload: null | object){
        this.type = type;
        this.payload = payload;
    };

    // type guard that ensures that the action exists in ActionPayload
    // and the payload passed to InferableAction matches the type
    public is<U extends keyof ActionPayload>(type: U): this is Action<U>{
        return this.type === type
    };
}