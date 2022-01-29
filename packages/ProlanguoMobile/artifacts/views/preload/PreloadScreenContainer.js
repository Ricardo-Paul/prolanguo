"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadScreenContainer = void 0;
const React = require("react");
const PreloadScreen_1 = require("./PreloadScreen");
const mobx_react_1 = require("mobx-react");
const Container_1 = require("../../Container");
const prolanguo_observable_1 = require("@prolanguo/prolanguo-observable");
const enums_1 = require("@prolanguo/prolanguo-common/enums");
const PreloadScreenFactory_1 = require("../../factories/preload/PreloadScreenFactory");
const PreloadScreenContainer_style_1 = require("./PreloadScreenContainer.style");
let PreloadScreenContainer = class PreloadScreenContainer extends Container_1.Container {
    constructor() {
        super(...arguments);
        this.observableScreen = new prolanguo_observable_1.ObservablePreloadScreen('', this.props.componentId, enums_1.ScreenName.PRELOAD_SCREEN);
        this.screenFactory = new PreloadScreenFactory_1.PreloadScreenFactory(this.props, this.eventBus);
        this.navigatorDelegate = this.screenFactory.createNavigatorDelegate();
        this.screenDelegate = this.screenFactory.createScreenDelegate(this.observableScreen);
    }
    // screen default styles
    static options(props) {
        return props.theme === enums_1.Theme.LIGHT ? PreloadScreenContainer_style_1.PreloadScreenStyle.SCREEN_FULL_LIGHT_STYLES
            : PreloadScreenContainer_style_1.PreloadScreenStyle.SCREEN_FULL_DARK_STYLES;
    }
    componentDidMount() {
        console.log("Event facade :", this.props.eventBusFactory);
        this.screenDelegate.autoUpdateMessage();
        this.screenDelegate.preload();
    }
    // wrapped inside a mobx reaction, in extendContainer > ComponentDidMount
    onThemeChanged(theme) {
        this.navigatorDelegate.mergeOptions(theme === enums_1.Theme.LIGHT
            ? PreloadScreenContainer_style_1.PreloadScreenStyle.SCREEN_LIGHT_STYLES_ONLY
            : PreloadScreenContainer_style_1.PreloadScreenStyle.SCREEN_DARK_STYLES_ONLY);
    }
    ;
    render() {
        return (React.createElement(PreloadScreen_1.PreloadScreen, { observableScreen: this.observableScreen, shouldRenderMessage: true, themeStore: this.props.rootStore.themeStore }));
    }
};
PreloadScreenContainer = __decorate([
    mobx_react_1.observer
], PreloadScreenContainer);
exports.PreloadScreenContainer = PreloadScreenContainer;
