import React from "react";
import { Container, ContainerProps } from "../../Container";
import { WelcomeScreen } from "./WelcomeScreen";
import { ObservableScreen, ObservableTitleTopBar } from "@prolanguo/prolanguo-observable";
import { ScreenName, Theme } from "@prolanguo/prolanguo-common/enums";
import { WelcomeScreenStyle } from "./WelcomeScreenContainer.style";
import { Options } from "react-native-navigation";
import { WelcomeScreenFactory } from "../../factories/welcome/WelcomeScreenFactory";

export class WelcomeScreenContainer extends Container { 
    public static options(props: ContainerProps): Options{
        return props.theme === Theme.LIGHT ? WelcomeScreenStyle.FULL_LIGHT_STYLES
            : WelcomeScreenStyle.FULL_DARK_STYLES
    };

    protected welcomeScreen = new WelcomeScreenFactory(
        this.props,
        this.eventBus
    );

    protected screenDelegate = this.welcomeScreen.createScreenDelegate();

    protected observableScreen = new ObservableScreen(
        this.props.componentId,
        ScreenName.WELCOME_SCREEN,
        new ObservableTitleTopBar('', null, null)
    );

    public render(){
        return (
            <WelcomeScreen 
                observableScreen={this.observableScreen}
                screenDelegate={this.screenDelegate}
                 />
        )
    }
};