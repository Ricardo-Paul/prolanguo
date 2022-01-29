"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTextInput = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
class DecorateTextInput extends react_1.default.Component {
    render() {
        const _a = this.props, { forwardRef } = _a, rest = __rest(_a, ["forwardRef"]);
        return (react_1.default.createElement(react_native_1.TextInput, Object.assign({ ref: forwardRef }, rest, { style: [styles.defaultTextInputStyles, this.props.style] }), this.props.children));
    }
}
;
exports.DefaultTextInput = react_1.default.forwardRef(function decorateTextInput(props, ref) {
    return react_1.default.createElement(DecorateTextInput, Object.assign({ forwardRef: ref }, props));
});
// change the font family according to platform
const styles = react_native_1.StyleSheet.create({
    defaultTextInputStyles: {
        fontFamily: "Verdana"
    }
});
