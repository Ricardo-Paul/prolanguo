import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { observable, IObservableValue } from "mobx";
import { ObservableScreen } from "../screen/ObservableScreen";
import { ObservableTitleTopBar } from "../top-bar/ObservableTitleTopBar";


export class ObservableSignUpScreen extends ObservableScreen {
    public email: IObservableValue<string>;
    public password: IObservableValue<string>;
    public confirmPassword: IObservableValue<string>;

    public shouldFocusPassword: IObservableValue<boolean>;
    public shouldFocusConfirmPassword: IObservableValue<boolean>;

    public constructor(
        email: string,
        password: string,
        confirmPassword: string,
        shouldFocusPassword: boolean,
        shouldFocusConfirmPassword: boolean,
        componentId: string,
        screenName: ScreenName,
        topBar: ObservableTitleTopBar
    ){
        super(componentId, screenName, topBar);

        this.email = observable.box(email);
        this.password = observable.box(password);
        this.confirmPassword = observable.box(confirmPassword);
        this.shouldFocusPassword = observable.box(shouldFocusPassword);
        this.shouldFocusConfirmPassword = observable.box(
            shouldFocusConfirmPassword
        );
    }
}