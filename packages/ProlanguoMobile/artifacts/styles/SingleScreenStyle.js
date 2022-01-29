"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleScreenStyle = void 0;
const TopBar_style_1 = require("../views/top-bar/TopBar.style");
const _ = require("lodash");
// TODO: move to config file
const darkPrimaryColor = "#001d55"; // will be replaced by a darker alternative for the status bar
const primaryColor = "#001d55";
class SingleScreenStyle {
}
exports.SingleScreenStyle = SingleScreenStyle;
SingleScreenStyle.SCREEN_BASE_STYLES_ONLY = {
    statusBar: {
        backgroundColor: darkPrimaryColor
    },
    topBar: {
        visible: true,
        noBorder: true,
        background: {
            color: primaryColor
        },
        elevation: 0, // remove topbar shadow for single screens
    },
    layout: {
        backgroundColor: primaryColor
    }
};
SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY = {};
SingleScreenStyle.SCREEN_DARK_STYLES_ONLY = {};
SingleScreenStyle.TOP_BAR_LIGHT_STYLES = _.merge({}, TopBar_style_1.lightStyles, {});
SingleScreenStyle.TOP_BAR_DARK_STYLES = _.merge({}, TopBar_style_1.darkStyles, {});
