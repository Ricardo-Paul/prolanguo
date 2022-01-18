import { Event } from "../interfaces/Event";

export type EventListener = (event: Event, unsubscribe: (id: number) => void) => void;