import { ActionType, createAction } from "@prolanguo/prolanguo-action"
import { fork, put, take } from "redux-saga/effects"
import { PublicSaga } from "./PublicSaga";

const userPayload = {
    name: "John Doe"
}

export class AuthSaga extends PublicSaga {
    *run(){
        yield fork([this, this.allowSignInAsGuest])
    };

    *allowSignInAsGuest(){
        // wait on AuthDelegate to dispatch USER__SIGN_IN_USER_AS_GUEST
        yield take(ActionType.USER__SIGN_IN_USER_AS_GUEST);
        // TODO: make API calls to SignUp (signInAsGuest, we generate the credentials) the user

        yield put(createAction(ActionType.USER__SIGN_IN_SUCCEEDED_AS_GUEST, userPayload));
    }
}