"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreen = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const WelcomeScreen_style_1 = require("./WelcomeScreen.style");
const Screen_1 = require("../common/Screen");
const DefaultText_1 = require("../common/DefaultText");
const SubmitButton_1 = require("../auth/SubmitButton");
const logo = require("../../../assets/images/logo/prolanguo_60x60.png");
;
class WelcomeScreen extends react_1.default.Component {
    get styles() {
        return WelcomeScreen_style_1.welcomeScreenResponsiveStyles.compile(this.props.observableScreen.screenLayout);
    }
    ;
    render() {
        return (react_1.default.createElement(Screen_1.Screen, { style: this.styles.screen },
            react_1.default.createElement(react_native_1.View, { style: this.styles.logo_container },
                react_1.default.createElement(react_native_1.Image, { source: logo })),
            react_1.default.createElement(react_native_1.View, { style: this.styles.welcome_text_container },
                react_1.default.createElement(DefaultText_1.DefaultText, { style: this.styles.welcome_text }, "Hola"),
                react_1.default.createElement(DefaultText_1.DefaultText, { style: this.styles.welcome_text }, "Welcome to prolanguo!"),
                react_1.default.createElement(DefaultText_1.DefaultText, { style: this.styles.welcome_text }, "Are you new here ?")),
            react_1.default.createElement(react_native_1.View, { style: this.styles.buttons_container },
                react_1.default.createElement(SubmitButton_1.SubmitButton, { buttonText: "Yes. I'm new ", style: this.styles.yes_btn, textStyle: this.styles.yest_btn_text, screenLayout: this.props.observableScreen.screenLayout, onSubmit: () => this.props.screenDelegate.signInAsGuest() }),
                react_1.default.createElement(SubmitButton_1.SubmitButton, { buttonText: "No. I'm not ", textStyle: this.styles.no_btn_text, style: this.styles.no_btn, screenLayout: this.props.observableScreen.screenLayout, onSubmit: () => this.props.screenDelegate }))));
    }
}
exports.WelcomeScreen = WelcomeScreen;
;
