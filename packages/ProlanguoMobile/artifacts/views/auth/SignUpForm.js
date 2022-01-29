"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpForm = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const InputField_1 = require("./InputField");
class SignUpForm extends react_1.default.Component {
    render() {
        console.log("Email here :", this.props.email);
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_1.Text, null, " Running ..."),
            react_1.default.createElement(InputField_1.InputField, { placeholder: "Email", value: this.props.email }),
            react_1.default.createElement(InputField_1.InputField, { placeholder: "Password", value: this.props.password }),
            react_1.default.createElement(InputField_1.InputField, { placeholder: "Confirm password", value: this.props.confirmPassword })));
    }
}
exports.SignUpForm = SignUpForm;
