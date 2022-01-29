"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpScreenContainer = void 0;
const SignUpScreen_1 = require("./SignUpScreen");
const prolanguo_observable_1 = require("@prolanguo/prolanguo-observable");
const Container_1 = require("../../Container");
const mobx_react_1 = require("mobx-react");
const enums_1 = require("@prolanguo/prolanguo-common/enums");
const react_1 = require("react");
let SignUpScreenContainer = class SignUpScreenContainer extends Container_1.Container {
    constructor() {
        super(...arguments);
        // observale local states from mobx
        this.observableScreen = new prolanguo_observable_1.ObservableSignUpScreen('', '', '', false, false, this.props.componentId, enums_1.ScreenName.SIGN_UP_SCREEN, new prolanguo_observable_1.ObservableTitleTopBar('Sign Up', null, null));
    }
    render() {
        return (react_1.default.createElement(SignUpScreen_1.SignUpScreen, { observableScreen: this.observableScreen }));
    }
};
SignUpScreenContainer = __decorate([
    mobx_react_1.observer
], SignUpScreenContainer);
exports.SignUpScreenContainer = SignUpScreenContainer;
;
