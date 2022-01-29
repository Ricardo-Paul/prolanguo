"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkStyles = exports.lightStyles = exports.baseStyles = void 0;
const react_native_1 = require("react-native");
const _ = require("lodash");
exports.baseStyles = {
    topBarContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
};
exports.lightStyles = react_native_1.StyleSheet.create(_.merge({}, exports.baseStyles, {}));
exports.darkStyles = react_native_1.StyleSheet.create(_.merge({}, exports.baseStyles, {}));
