import React from "react";
import { Image, Text, View } from "react-native";
import { welcomeScreenResponsiveStyles } from "./WelcomeScreen.style";
import { ObservableScreen } from "@prolanguo/prolanguo-observable";
import { Screen } from "../common/Screen";
import { DefaultText } from "../common/DefaultText";
import { SubmitButton } from "../auth/SubmitButton";
import { WelcomeScreenDelegate } from "../../delegates/welcome/WelcomeScreenDelegate";
const logo = require("../../../assets/images/logo/prolanguo_60x60.png");

interface WelcomeScreenProps {
  observableScreen: ObservableScreen,
  screenDelegate: WelcomeScreenDelegate
};

export class WelcomeScreen extends React.Component<WelcomeScreenProps> {
  get styles() {
    return welcomeScreenResponsiveStyles.compile(
      this.props.observableScreen.screenLayout
    );
  };
  public render(): React.ReactElement<any> {
    return (
      <Screen style={this.styles.screen}>
        <View style={this.styles.logo_container} >  
          <Image source={logo} />
        </View>
        <View style={this.styles.welcome_text_container}>
          <DefaultText style={this.styles.welcome_text}>
            Hola
          </DefaultText>
          <DefaultText style={this.styles.welcome_text} >
            Welcome to prolanguo!
          </DefaultText>
          <DefaultText style={this.styles.welcome_text} >
            Are you new here ?
          </DefaultText>
        </View>
        <View style={this.styles.buttons_container}>
          <SubmitButton 
            buttonText={"Yes. I'm new "}  
            style={this.styles.yes_btn} 
            textStyle={this.styles.yest_btn_text}
            screenLayout={this.props.observableScreen.screenLayout}
            onSubmit={() => this.props.screenDelegate.signInAsGuest()}  />
          <SubmitButton 
            buttonText={"No. I'm not "}
            textStyle={this.styles.no_btn_text}
            style={this.styles.no_btn} 
            screenLayout={this.props.observableScreen.screenLayout} 
            onSubmit={() => this.props.screenDelegate} /> 
            {/* do something when pressed here */}
        </View>
      </Screen>
    )
  }
};
