import { EventListener } from "../types/EventListener";
import { Event } from "../interfaces/Event";

export function group(...listeners: EventListener[]): EventListener {
    return (event: Event, unsubscribe: () => void) => {
        listeners.forEach(
            (listener) => {
                listener(event, unsubscribe)
            }
        );
    };
};