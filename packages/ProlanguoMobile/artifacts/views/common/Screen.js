"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
class Screen extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, Object.assign({}, this.props), this.props.children));
    }
}
exports.Screen = Screen;
