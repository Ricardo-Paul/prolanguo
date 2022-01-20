import { Event } from "../interfaces/Event";

export type EventListener = (event: Event, unsubscribe: () => void) => void;