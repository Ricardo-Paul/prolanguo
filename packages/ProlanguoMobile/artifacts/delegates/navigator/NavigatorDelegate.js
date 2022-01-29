"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigatorDelegate = void 0;
const react_native_navigation_1 = require("react-native-navigation");
class NavigatorDelegate {
    constructor(componentId) {
        this.componentId = componentId;
    }
    ;
    // update screen options
    mergeOptions(options) {
        react_native_navigation_1.Navigation.mergeOptions(this.componentId, options);
    }
    ;
    resetTo(screenName, options) {
        react_native_navigation_1.Navigation.setStackRoot(this.componentId, {
            component: {
                name: screenName,
                options
            }
        });
    }
}
exports.NavigatorDelegate = NavigatorDelegate;
