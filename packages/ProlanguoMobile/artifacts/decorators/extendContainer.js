"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendContainer = void 0;
const react_native_splash_screen_1 = require("react-native-splash-screen");
// TODO: add type annotation to constructor
function extendContainer(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
        }
        ;
        componentDidMount() {
            if (typeof super.componentDidMount !== "undefined") {
                super.componentDidMount();
            }
            const { theme } = this.props.rootStore.themeStore;
            console.log("Container mounted");
            console.log("Mounted Screen Container extended by extendContainer :", constructor.name);
            console.log("current theme pulled from rootStore(global state)", theme);
            // onThemeChanged is defined in all screenContainers, to get autocompletion it is declared in 
            // the Container base abstract class.
            this.observer.reaction(() => theme, (theme) => {
                this.onThemeChanged(theme);
            });
            console.log("Splash screen API", react_native_splash_screen_1.default);
            setTimeout(() => {
                react_native_splash_screen_1.default.hide();
            }, 2000);
        }
        componentWillUnmount() {
        }
    };
}
exports.extendContainer = extendContainer;
