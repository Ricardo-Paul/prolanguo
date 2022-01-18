import { Store } from "redux";
import { EventBus } from "./eventBus";
import { EventFacade } from "./eventFacade";

export class EventBusFactory{
    store: Store;
    eventFacade: EventFacade;
    constructor(store: Store, eventFacade: EventFacade){
        this.store = store;
        this.eventFacade = eventFacade;
    };

    public createBus(): EventBus{
        return new EventBus(this.store, this.eventFacade)
    }
}