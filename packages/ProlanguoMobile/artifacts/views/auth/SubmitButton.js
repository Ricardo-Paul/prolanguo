"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitButton = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const DefaultText_1 = require("../common/DefaultText");
const SubmitButton_style_1 = require("./SubmitButton.style");
class SubmitButton extends react_1.default.Component {
    get styles() {
        return SubmitButton_style_1.submitButtonResponsiveStyles.compile(this.props.screenLayout);
    }
    ;
    render() {
        return (react_1.default.createElement(react_native_1.TouchableOpacity, Object.assign({ onPress: this.props.onSubmit }, this.props, { style: [this.styles.button_touchable, this.props.style] }),
            react_1.default.createElement(DefaultText_1.DefaultText, { style: this.props.textStyle }, this.props.buttonText)));
    }
}
exports.SubmitButton = SubmitButton;
