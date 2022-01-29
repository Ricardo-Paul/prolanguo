"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultText = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
class DefaultText extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(react_native_1.Text, Object.assign({ allowFontScaling: false }, this.props, { style: [styles.defaultTextStyle, this.props.style] }), this.props.children));
    }
}
exports.DefaultText = DefaultText;
const styles = react_native_1.StyleSheet.create({
    defaultTextStyle: {}
});
