"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInitialState = void 0;
const prolanguo_observable_1 = require("@prolanguo/prolanguo-observable");
const enums_1 = require("@prolanguo/prolanguo-common/enums");
// put this setting in a config.json file in the app root
const defaultThemeSettings = {
    trigger: enums_1.ThemeTrigger.SYSTEM
};
function makeInitialState() {
    const userStore = new prolanguo_observable_1.ObservableUserStore(null);
    const themestore = new prolanguo_observable_1.ObservableThemeStore(userStore, defaultThemeSettings, enums_1.Theme.LIGHT);
    return new prolanguo_observable_1.ObservableRootStore(userStore, themestore);
}
exports.makeInitialState = makeInitialState;
;
