import { Action, ActionPayload, ActionType, InferableAction } from "@prolanguo/prolanguo-action";
import { Event } from "../interfaces/Event";
import { EventListener } from "../types/EventListener";
import * as _ from "lodash";

export function on<T extends keyof ActionPayload>(
    actionType: T[], 
    callback: (args: ActionPayload[T]) => void
): EventListener {
    return (event: Event) => {
        if(_.isArray(actionType)){
            actionType.forEach(type => {
                if(event.action.is(type)){
                    callback(event.action.payload)
                }
            })
        } else {
            if(event.action.is(actionType)){
                callback(event.action.payload)
            }
        }
    }
};