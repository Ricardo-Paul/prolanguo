import { DatabaseFacade } from "@prolanguo/prolanguo-local-db";
import { AppSaga } from "../sagas/AppSaga";
import { AuthSaga } from "../sagas/AuthSaga";
import { DatabaseSaga } from "../sagas/DatabaseSaga";
import { PublicSaga } from "../sagas/PublicSaga";



export class PublicSagaFactory{
    private database: DatabaseFacade;

    public constructor(
        database: DatabaseFacade
    ){
        this.database = database
    }

    public createPublicSagas(): PublicSaga[]{
        return [
            new AppSaga(),
            new AuthSaga(),
            new DatabaseSaga(this.database)
        ];
    };
}