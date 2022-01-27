import React from "react";
import { TextProps, Text, View, StyleSheet } from "react-native"

export class DefaultText extends React.Component<TextProps> {
  public render(): React.ReactElement<any> {
    return (
      <Text
        allowFontScaling={false}
        {...this.props} style={[styles.defaultTextStyle, this.props.style]}>
          {this.props.children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  defaultTextStyle: {

  }
})