import React from "react";
import { View, Text} from "react-native";
import { InputField } from "./InputField";

interface SignUpFormProps {

}

export class SignUpForm extends React.Component<SignUpFormProps>{
  public render(): React.ReactElement<any> {
    return (
      <View>
        <InputField placeholder="Email" />
      </View>
    )
  }
}