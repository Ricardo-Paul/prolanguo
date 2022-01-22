import { PublicSaga } from "./PublicSaga";
import { take, fork, put } from "redux-saga/effects";
import { ActionType, createAction } from "@prolanguo/prolanguo-action";

export class AppSaga extends PublicSaga{
    public *run() {
        yield fork([this, this.allowInitializeApp])
    }

    *allowInitializeApp(){
        // waiting on PreloadScreenDelegate to dispatch APP__INITITIALIZE
        yield take(ActionType.APP__INITIALIZE);

        // continue app flow
        yield put(createAction(ActionType.APP__INITIALIZING, null));
    }
}