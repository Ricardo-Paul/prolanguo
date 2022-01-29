"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputField = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const DefaultTextInput_1 = require("../common/DefaultTextInput");
;
class InputField extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(DefaultTextInput_1.DefaultTextInput, { placeholderTextColor: "#999", placeholder: this.props.placeholder, value: this.props.value.get() })));
    }
}
exports.InputField = InputField;
;
