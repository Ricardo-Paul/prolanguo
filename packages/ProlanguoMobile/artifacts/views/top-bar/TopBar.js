"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopBar = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const TopBar_style_1 = require("./TopBar.style");
class TopBar extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: TopBar_style_1.lightStyles.topBarContainer },
            react_1.default.createElement(react_native_1.Text, null, "Top bar")));
    }
}
exports.TopBar = TopBar;
