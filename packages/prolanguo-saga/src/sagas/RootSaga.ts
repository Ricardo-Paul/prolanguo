import { PublicSagaFactory } from "../factories/PublicSagaFactory";
import { fork } from "redux-saga/effects";

export class RootSaga{
    *run(){
        console.log("Root saga hit")
        yield fork([this, this.allowForkPublicSagas])
    }

    constructor(){}

    *allowForkPublicSagas(){
        const publicSaga = new PublicSagaFactory();
        for(const saga of publicSaga.createPublicSagas()){
            yield fork([saga, saga.run])
        }
    }
}