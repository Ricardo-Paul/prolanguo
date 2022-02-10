import { PublicSagaFactory } from "../factories/PublicSagaFactory";
import { fork } from "redux-saga/effects";
import { DatabaseFacade } from "@prolanguo/prolanguo-local-db";

export class RootSaga{
    private database: DatabaseFacade;
    constructor(database: DatabaseFacade){
        this.database = database
    }
    *run(){
        console.log("Root saga hit")
        yield fork([this, this.allowForkPublicSagas])
    }

    *allowForkPublicSagas(){
        const publicSaga = new PublicSagaFactory(
            this.database
        );
        for(const saga of publicSaga.createPublicSagas()){
            yield fork([saga, saga.run])
        }
    }
}