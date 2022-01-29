"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const mobx_react_1 = require("mobx-react");
const React = require("react");
const assert_1 = require("@prolanguo/prolanguo-common/assert");
const ServiceRegistry_1 = require("./ServiceRegistry");
let Provider = class Provider extends React.Component {
    render() {
        console.log("Children/child received :", this.props.children);
        const child = (0, assert_1.assertExists)(React.Children.only(this.props.children), "Provider requires one child");
        if (React.isValidElement(child)) {
            const containerProps = Object.assign({ componentId: child.props.componentId, screenType: child.props.screenType, theme: child.props.theme, styles: child.props.styles, passedProps: child.props.passedProps }, ServiceRegistry_1.ServiceRegistry.services);
            return React.cloneElement(child, containerProps);
        }
        else {
            throw new Error('Provider must have a valid child element');
        }
    }
};
Provider = __decorate([
    mobx_react_1.observer
], Provider);
exports.Provider = Provider;
