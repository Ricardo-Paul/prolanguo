import { EventBusFactory } from "@prolanguo/prolanguo-event";
import { ObservableRootStore } from "@prolanguo/prolanguo-observable";


// import Observables and the event bus factory
export interface Services {
    readonly rootStore: ObservableRootStore
    readonly eventBusFactory: EventBusFactory
}