import { fork, take, put, call } from "redux-saga/effects";
import { PublicSaga } from "./PublicSaga";
import { DatabaseFacade } from "@prolanguo/prolanguo-local-db";
import { ActionType, createAction } from "@prolanguo/prolanguo-action";

export class DatabaseSaga extends PublicSaga {

  private database: DatabaseFacade;
  constructor(database: DatabaseFacade) {
    super();
    this.database = database
  };

  public *run() {
    yield fork([this, this.allowConnectUserDb]);
  }

  public *allowConnectUserDb() {
    console.log("allowConnectUserDb fired ... ");
    while (true) {
      yield take(ActionType.DATABASE__CONNECT_USER_DB);
      try {
        yield put(createAction(ActionType.DATABASE__CONNECTING_USER_DB, null));
        yield call([this.database, 'connectUserDb'], 'userDb.sqlite3');
        yield put(
          createAction(ActionType.DATABASE__CONNECT_USER_DB_SUCCEEDED, null)
        );
        console.log("DB inited !")
      } catch (error) {
        yield put(
          createAction(ActionType.DATABASE__CONNECT_USER_DB_FAILED, {
            errorCode: 500, //replace that
            error
          })
        )
      }
    }
  }
}