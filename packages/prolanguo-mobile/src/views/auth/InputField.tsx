import React from "react";
import { View, Text} from "react-native";
import { DefaultTextInput } from "../common/DefaultTextInput";
import { IObservableValue } from "mobx";

interface InputFieldProps {
  placeholder: string;
  value: IObservableValue<string>
};

export class InputField extends React.Component<InputFieldProps> {
  public render(): React.ReactElement<any> {
    return (
      <View>
        <DefaultTextInput 
          placeholderTextColor={"#999"}
          placeholder={this.props.placeholder}
          value={this.props.value.get()}
        />
      </View>
    )
  }
};