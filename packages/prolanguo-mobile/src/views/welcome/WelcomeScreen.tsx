import React from "react";
import { Text } from "react-native";
import { welcomeScreenResponsiveStyles } from "./WelcomeScreen.style";
import { ObservableScreen } from "@prolanguo/prolanguo-observable";

interface WelcomeScreenProps{
    observableScreen: ObservableScreen
}
export class WelcomeScreen extends React.Component<WelcomeScreenProps>{
    get styles(){
        return welcomeScreenResponsiveStyles.compile(
            this.props.observableScreen.screenLayout
        );
    };
    public render(): React.ReactElement<any> {
        return (
            <Text style={this.styles.welcome_text}> 
                Welcome to prolanguo! 
                Is this your first time here? what
                {this.props.observableScreen.screenLayout.height}
            </Text>
        )
    }
};
