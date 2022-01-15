import { InferableAction } from "@prolanguo/prolanguo-action";
import { ObservableRootStore } from "@prolanguo/prolanguo-observable";
import { createStore, applyMiddleware, Middleware, Store } from "redux";
import { RootStoreReduer } from "../reducers/RootStoreReducer";
import { StoreOptions } from "../interfaces/StoreOptions";
import logger, { ReduxLoggerOptions, createLogger } from "redux-logger"

export class StoreFactory {
    private middleware: readonly Middleware[];
    private options: StoreOptions;

    public constructor(
        options: StoreOptions,
        middleware?: readonly Middleware[]
    ){
        this.options = options;
        this.middleware = middleware || [];
        this.middleware = this.middleware.concat(); //TODO: add a transaction middlware to the store
        if(options.enableLogging === true){
            this.enableLogger()
        }
    }

    private enableLogger(options?: ReduxLoggerOptions): void{
        // use the default logger (logger) if given no options
        if(typeof options !== "undefined"){
            this.middleware = this.middleware.concat(createLogger(options))
        } else {
            this.middleware = this.middleware.concat(logger);
        }
    }

    public createStore(rootStore: ObservableRootStore): Store<ObservableRootStore>{
        const rootStoreReducer = new RootStoreReduer(rootStore);

        return createStore(
            (rootStore, anyAction): ObservableRootStore => {
                rootStoreReducer.perform(
                    new InferableAction(anyAction.type, anyAction.payload)
                );
                return rootStore as ObservableRootStore;
            },
            rootStore,
            applyMiddleware(...this.middleware)
        )
    }
}