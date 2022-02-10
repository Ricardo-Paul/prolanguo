import { RootSaga } from "../sagas/RootSaga";
import { SagaMiddleware, SagaMiddlewareOptions } from "redux-saga";
import createSagaMiddleware from "@redux-saga/core"
import { DatabaseFacade } from "@prolanguo/prolanguo-local-db";
import { SqliteDatabaseAdapter } from "@prolanguo/prolanguo-sqlite-adapter";


export class SagaFacade{
    private sagaMiddleware: SagaMiddleware<{}>;
    private database: DatabaseFacade;

    constructor(
        options: SagaMiddlewareOptions,
        sqliteAdapter: SqliteDatabaseAdapter
    ){
        this.sagaMiddleware = createSagaMiddleware(options);
        this.database = new DatabaseFacade(sqliteAdapter);
    };

    public getMiddleware(){
        return this.sagaMiddleware
    };

    public run(){
        console.log("run method in saga facade");
        const root = new RootSaga(
            this.database
        );
        this.sagaMiddleware.run(() => root.run());
    }
} 