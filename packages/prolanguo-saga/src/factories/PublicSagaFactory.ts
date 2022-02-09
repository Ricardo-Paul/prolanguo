import { AppSaga } from "../sagas/AppSaga";
import { AuthSaga } from "../sagas/AuthSaga";
import { PublicSaga } from "../sagas/PublicSaga";


export class PublicSagaFactory{
    public constructor(){}

    public createPublicSagas(): PublicSaga[]{
        return [
            new AppSaga(),
            new AuthSaga()
        ];
    };
}