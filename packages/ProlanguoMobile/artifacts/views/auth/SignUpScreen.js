"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpScreen = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const SignUpForm_1 = require("./SignUpForm");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
let SignUpScreen = class SignUpScreen extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.e = "";
        this.email = mobx_1.observable.box(this.e);
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(SignUpForm_1.SignUpForm, { email: this.email, password: this.email, confirmPassword: this.email })));
    }
};
SignUpScreen = __decorate([
    mobx_react_1.observer
], SignUpScreen);
exports.SignUpScreen = SignUpScreen;
;
