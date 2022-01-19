import { PublicSagaFactory } from "../factories/PublicSagaFactory";
import { fork } from "redux-saga/effects";

export class RootSaga{
    // top most node in the saga tree
    *run(){
        yield fork([this, this.allowForkPublicSagas])
    }

    // for all public sagas
    *allowForkPublicSagas(){
        const publicSaga = new PublicSagaFactory();
        for(const saga of publicSaga.createPublicSagas()){
            yield fork([saga, saga.run])
        }
    }
}