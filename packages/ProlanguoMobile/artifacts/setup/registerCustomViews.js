"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomViews = void 0;
const react_1 = require("react");
const react_native_navigation_1 = require("react-native-navigation");
const CustomViews_1 = require("../constants/CustomViews");
const Provider_1 = require("../Provider");
const _ = require("lodash");
function registerCustomViews() {
    console.log("Registering custom views ...");
    _.forOwn(CustomViews_1.CustomViews, (container, screenName) => {
        const Child = container;
        react_native_navigation_1.Navigation.registerComponent(screenName, () => (props) => react_1.default.createElement(Provider_1.Provider, null,
            react_1.default.createElement(Child, Object.assign({}, props))), () => Child);
    });
}
exports.registerCustomViews = registerCustomViews;
;
