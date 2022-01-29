"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadScreen = void 0;
const react_1 = require("react");
const mobx_react_1 = require("mobx-react");
const react_native_1 = require("react-native");
const PreloadScreen_styles_1 = require("./PreloadScreen.styles");
let PreloadScreen = class PreloadScreen extends react_1.default.Component {
    get styles() {
        return PreloadScreen_styles_1.preloadScreenResponsiveStyles.compile(this.props.observableScreen.screenLayout);
    }
    ;
    render() {
        const screenHeight = this.props.observableScreen.screenLayout.height;
        const screenWidth = this.props.observableScreen.screenLayout.width;
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_1.Text, null,
                " ",
                this.props.observableScreen.message,
                " ")));
    }
};
PreloadScreen = __decorate([
    mobx_react_1.observer
], PreloadScreen);
exports.PreloadScreen = PreloadScreen;
