import { ObservableScreenLayout } from "@prolanguo/prolanguo-observable";
import React from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { DefaultText } from "../common/DefaultText";
import { submitButtonResponsiveStyles, SubmitButtonStyles} from "./SubmitButton.style";

interface SubmitButtonProps{
    buttonText: string,
    style?: ViewStyle,
    textStyle: TextStyle,
    screenLayout: ObservableScreenLayout
}

export class SubmitButton extends React.Component<SubmitButtonProps> {
    private get styles(): SubmitButtonStyles{
        return submitButtonResponsiveStyles.compile(
            this.props.screenLayout
        )
    };

    render(): React.ReactNode {
        return(
            <TouchableOpacity {...this.props} style={[this.styles.button_touchable, this.props.style]}>
                <DefaultText style={this.props.textStyle} >
                    {this.props.buttonText}
                </DefaultText>
            </TouchableOpacity>
        )
    }
}