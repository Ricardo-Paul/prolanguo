"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerScreens = void 0;
const ScreenContainers_1 = require("../constants/ScreenContainers");
const _ = require("lodash");
const extendContainer_1 = require("../decorators/extendContainer");
const react_native_navigation_1 = require("react-native-navigation");
const Provider_1 = require("../Provider");
const react_1 = require("react");
function registerScreens() {
    _.forOwn(ScreenContainers_1.ScreenContainers, (container, screenName) => {
        const Child = (0, extendContainer_1.extendContainer)(container);
        react_native_navigation_1.Navigation.registerComponent(screenName, () => (props) => react_1.default.createElement(Provider_1.Provider, null,
            react_1.default.createElement(Child, Object.assign({}, props))), () => Child);
    });
}
exports.registerScreens = registerScreens;
;
