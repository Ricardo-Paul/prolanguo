import { EventListener } from "./types/EventListener";

export class EventFacade{
    subscribeMap = new Map<number, EventListener>();

    currentId: number = 0;

    subscribe(listener: EventListener): () => void{
        const currentId = this.getCurrentId();
        this.subscribeMap.set(currentId, listener);
        return () => this.unsubscribe(currentId);
    }

    unsubscribe(id: number){
        this.subscribeMap.delete(id);
    }

    getCurrentId(){
        return this.currentId++
    }
}