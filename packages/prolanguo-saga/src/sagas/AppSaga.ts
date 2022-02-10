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

        yield put(createAction(ActionType.APP__INITIALIZING, null));
        // TODO: check user connection
        // TODO: observe user connection 

        // TODO: connect to user database
        yield put(createAction(ActionType.DATABASE__CONNECT_USER_DB, null));

        yield put(createAction(ActionType.APP__INITIALIZE_SUCCEEDED, null));

        while(true){
            yield take(ActionType.APP__INITIALIZE);
            yield put(createAction(ActionType.APP__ALREADY_INITIALIZED, null));
        }
    }
}