"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadScreenStyle = void 0;
// based on singleScreenStyle
const _ = require("lodash");
const SingleScreenStyle_1 = require("../../styles/SingleScreenStyle");
class PreloadScreenStyle {
}
exports.PreloadScreenStyle = PreloadScreenStyle;
PreloadScreenStyle.SCRENN_BASE_STYLES_ONLY = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_BASE_STYLES_ONLY, {});
// light or dark only
PreloadScreenStyle.SCREEN_LIGHT_STYLES_ONLY = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY, {});
PreloadScreenStyle.SCREEN_DARK_STYLES_ONLY = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_DARK_STYLES_ONLY, {});
// full light = base styles + light only styles
PreloadScreenStyle.SCREEN_FULL_LIGHT_STYLES = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_BASE_STYLES_ONLY, SingleScreenStyle_1.SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY);
// full dark = base styles + dark only styles
PreloadScreenStyle.SCREEN_FULL_DARK_STYLES = _.merge({}, SingleScreenStyle_1.SingleScreenStyle.SCREEN_BASE_STYLES_ONLY, SingleScreenStyle_1.SingleScreenStyle.SCREEN_DARK_STYLES_ONLY);
