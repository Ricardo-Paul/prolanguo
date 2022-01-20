import { EventListener } from "./types/EventListener";
import { Action, Dispatch, Middleware } from "redux";
import { Event } from "./interfaces/Event";
import * as uuid from "uuid";
import { InferableAction } from "@prolanguo/prolanguo-action";

export class EventFacade{
    subscribeMap = new Map<number, EventListener>();

    public getMiddleware(): Middleware{
        return(): ReturnType<Middleware> => {
            return (next: Dispatch<Action>)=> {
                return (action: any)=> {
                    const result = next(action);
                    this.notifySubscribers({
                        eventId: uuid.v4(),
                        // we pass the event listeners an Inferable action instance, they'll use the is() method
                        // to decide which action to react to
                        action: new InferableAction(action.type, action.payload)
                    });

                    return result;
                }
            }
        }
    }

    currentId: number = 0;

    subscribe(listener: EventListener): () => void{
        const currentId = this.getCurrentId();
        this.subscribeMap.set(currentId, listener);
        return () => this.unsubscribe(currentId);
    }

    unsubscribe(id: number): void{
        this.subscribeMap.delete(id);
    }

    getCurrentId(){
        return this.currentId++
    }

    notifySubscribers(event: Event){
        for(const [ id, listener ] of this.subscribeMap.entries()){
            listener(event, () => this.unsubscribe(id))
        }
    }
}