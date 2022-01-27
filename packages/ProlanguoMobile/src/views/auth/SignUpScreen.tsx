import { ObservableSignUpScreen } from "@prolanguo/prolanguo-observable";
import React from "react";
import { View, Text } from "react-native";
import { SignUpForm } from "./SignUpForm";
import { observer } from "mobx-react";
import { observable } from "mobx";


export interface SignUpScreenProps {
  observableScreen: ObservableSignUpScreen
}

@observer
export class SignUpScreen extends React.Component<SignUpScreenProps>{
  private e: string = "";
  protected email = observable.box(this.e);

  public render() {
    return (
      <View>
        <SignUpForm 
          email={this.email}
          password={this.email}
          confirmPassword={this.email}
        />
      </View>
    )
  }
};