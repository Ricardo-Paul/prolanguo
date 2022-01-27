import React from "react";
import { View, Text} from "react-native";
import { InputField } from "./InputField";
import { IObservableValue } from "mobx"

interface SignUpFormProps {
  email: IObservableValue<string>;
  password: IObservableValue<string>;
  confirmPassword: IObservableValue<string>;
}

export class SignUpForm extends React.Component<SignUpFormProps>{
  public render(): React.ReactElement<any> {
    console.log("Email here :", this.props.email)
    return (
      <View>
        <Text> Running ...</Text>
        <InputField 
          placeholder="Email"
          value={this.props.email}
        />
        <InputField 
          placeholder="Password"
          value={this.props.password}
        />
        <InputField 
          placeholder="Confirm password" 
          value={this.props.confirmPassword}
        />
      </View>
    )
  }
}