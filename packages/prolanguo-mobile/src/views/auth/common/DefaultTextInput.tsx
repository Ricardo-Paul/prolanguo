import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';


class DecorateTextInput extends React.Component<TextInputProps & { forwardRef?: any }>{
  public render(): React.ReactElement<any> {
    const { forwardRef, ...rest } = this.props;
    return (
      <TextInput
        ref={forwardRef}
        {...rest}
        style={[styles.defaultTextInputStyles, this.props.style]}
      >
        {this.props.children}
      </TextInput>
    )
  }
};

export const DefaultTextInput = React.forwardRef<TextInput, TextInputProps>(
  function decorateTextInput(props, ref): React.ReactElement<any>{
    return <DecorateTextInput forwardRef={ref} {...props} />
})

// change the font family according to platform
const styles = StyleSheet.create({
  defaultTextInputStyles: {
    fontFamily: "Verdana"
  }
})