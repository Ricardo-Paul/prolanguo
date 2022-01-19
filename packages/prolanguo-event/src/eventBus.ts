import { Action } from "@prolanguo/prolanguo-action";
import { EventListener } from "./types/EventListener";
import { Store } from "redux";
import { EventFacade } from "./eventFacade";

export class EventBus{
    private store: Store;
    private eventFacade: EventFacade;
    disposers: (() => void)[]

    constructor(store: Store, eventFacade: EventFacade){
        this.store = store;
        this.eventFacade = eventFacade;
        this.disposers = []
    }

    public pubsub(action: Action<any>, listener: EventListener): () => void{
        this.publish(action);
        const unsubscribe = this.subscribe(listener);
        return unsubscribe;
    };

    publish(action: Action<any>){
        this.store.dispatch(action)
    };

    subscribe(listener: EventListener): () => void{
        const disposer = this.eventFacade.subscribe(listener);
        this.disposers.push(disposer);
        return disposer;
    }

    usubscribeAll(){
        this.disposers.forEach(
            (dispoer) => {
                dispoer();
            }
        )
    };
}