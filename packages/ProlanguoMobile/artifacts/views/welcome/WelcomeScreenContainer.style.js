"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenStyle = void 0;
const SingleScreenStyle_1 = require("../../styles/SingleScreenStyle");
const _ = require("lodash");
const useCustomTopBar_1 = require("../../utils/useCustomTopBar");
const enums_1 = require("@prolanguo/prolanguo-common/dist/enums");
class WelcomeScreenStyle {
}
exports.WelcomeScreenStyle = WelcomeScreenStyle;
WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_BASE_STYLES_ONLY, {
    topBar: (0, useCustomTopBar_1.useCustomTopBar)({
        screenName: enums_1.ScreenName.WELCOME_SCREEN,
        styles: {
            light: SingleScreenStyle_1.SingleScreenStyle.TOP_BAR_LIGHT_STYLES,
            dark: SingleScreenStyle_1.SingleScreenStyle.TOP_BAR_DARK_STYLES
        }
    })
});
WelcomeScreenStyle.SCREEN_LIGHT_STYLES_ONLY = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY, {});
WelcomeScreenStyle.SCREEN_DARK_STYLES_ONLY = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_DARK_STYLES_ONLY, {});
WelcomeScreenStyle.FULL_LIGHT_STYLES = _.merge({}, WelcomeScreenStyle.SCREEN_LIGHT_STYLES_ONLY, WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY);
WelcomeScreenStyle.FULL_DARK_STYLES = _.merge({}, WelcomeScreenStyle.SCREEN_DARK_STYLES_ONLY, WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY);
;
