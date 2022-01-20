import { RootSaga } from "../sagas/RootSaga";
import { SagaMiddleware, SagaMiddlewareOptions } from "redux-saga";
import createSagaMiddleware from "@redux-saga/core"

export class SagaFacade{
    private sagaMiddleware: SagaMiddleware<{}>
    constructor(options: SagaMiddlewareOptions){
        this.sagaMiddleware = createSagaMiddleware(options);
    };

    public getMiddleware(){
        return this.sagaMiddleware
    };

    public run(){
        console.log("run method in saga facade")
        const root = new RootSaga();
        this.sagaMiddleware.run(() => root.run());
    }
} 