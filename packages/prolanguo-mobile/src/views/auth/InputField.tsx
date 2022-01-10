import React from "react";
import { View, Text} from "react-native";
import { DefaultTextInput } from "../common/DefaultTextInput";

interface InputFieldProps {
  placeholder: string
};

export class InputField extends React.Component<InputFieldProps> {
  public render(): React.ReactElement<any> {
    return (
      <View>
        <DefaultTextInput />
      </View>
    )
  }
};