import { PublicSaga } from "./PublicSaga";
import { take, fork } from "redux-saga/effects";

export class AppSaga extends PublicSaga{
    public *run() {
        yield fork([this, this.allowInitializeApp])
    }

    *allowInitializeApp(){
        console.log("Waiting for APP__INITIALIZE", "APP SAGA");
        yield take("APP__INITIALIZE");
    }
}