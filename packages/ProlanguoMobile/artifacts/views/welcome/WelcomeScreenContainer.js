"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenContainer = void 0;
const react_1 = require("react");
const Container_1 = require("../../Container");
const WelcomeScreen_1 = require("./WelcomeScreen");
const prolanguo_observable_1 = require("@prolanguo/prolanguo-observable");
const enums_1 = require("@prolanguo/prolanguo-common/enums");
const WelcomeScreenContainer_style_1 = require("./WelcomeScreenContainer.style");
const WelcomeScreenFactory_1 = require("../../factories/welcome/WelcomeScreenFactory");
class WelcomeScreenContainer extends Container_1.Container {
    constructor() {
        super(...arguments);
        this.welcomeScreen = new WelcomeScreenFactory_1.WelcomeScreenFactory(this.props, this.eventBus);
        this.screenDelegate = this.welcomeScreen.createScreenDelegate();
        this.observableScreen = new prolanguo_observable_1.ObservableScreen(this.props.componentId, enums_1.ScreenName.WELCOME_SCREEN, new prolanguo_observable_1.ObservableTitleTopBar('', null, null));
    }
    static options(props) {
        return props.theme === enums_1.Theme.LIGHT ? WelcomeScreenContainer_style_1.WelcomeScreenStyle.FULL_LIGHT_STYLES
            : WelcomeScreenContainer_style_1.WelcomeScreenStyle.FULL_DARK_STYLES;
    }
    ;
    render() {
        return (react_1.default.createElement(WelcomeScreen_1.WelcomeScreen, { observableScreen: this.observableScreen, screenDelegate: this.screenDelegate }));
    }
}
exports.WelcomeScreenContainer = WelcomeScreenContainer;
;
