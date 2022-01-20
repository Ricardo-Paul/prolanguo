import { ActionType, Action, ActionPayload } from "@prolanguo/prolanguo-action";
import { Event } from "../interfaces/Event";
import { EventListener } from "../types/EventListener";

export function once<T extends keyof ActionPayload>(
    actionType: T,
    callback: (args: ActionPayload[T]) => void
): EventListener{
    return (event: Event, unsubscribe: () => void) => {
        if(event.action.is(actionType)){
            unsubscribe();
            callback(event.action.payload);
        }
    }
}