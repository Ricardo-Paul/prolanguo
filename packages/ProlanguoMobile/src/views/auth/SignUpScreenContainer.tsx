import { SignUpScreen } from "./SignUpScreen";
import { ObservableSignUpScreen, ObservableTitleTopBar } from "@prolanguo/prolanguo-observable";
import { Container } from "../../Container";
import { observer } from "mobx-react";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { Text } from "react-native";
import React from "react";


@observer
export class SignUpScreenContainer extends Container {

    // observale local states from mobx
    protected observableScreen = new ObservableSignUpScreen(
        '',
        '',
        '',
        false,
        false,
        this.props.componentId,
        ScreenName.SIGN_UP_SCREEN,
        new ObservableTitleTopBar('Sign Up', null, null),
    );

    public render(): React.ReactElement<any>{
        return(
            <SignUpScreen  observableScreen={this.observableScreen}/>
        )
    }
};