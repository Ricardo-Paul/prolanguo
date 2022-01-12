import { ObservableSignUpScreen } from "@prolanguo/prolanguo-observable";
import React from "react";
import { View, Text } from "react-native";
import { SignUpForm } from "./SignUpForm";
import { observable } from "mobx";


export interface SignUpScreenProps {
  observableScreen: ObservableSignUpScreen
}

// make use of the observable 
export class SignUpScreen extends React.Component<SignUpScreenProps>{
  private e: string = "";
  protected email = observable.box(this.e);

  public render() {
    debugger;
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