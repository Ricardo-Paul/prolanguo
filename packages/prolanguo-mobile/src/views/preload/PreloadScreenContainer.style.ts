// based on singleScreenStyle
import * as _ from "lodash";
import { SingleScreenStyle } from "../../styles/SingleScreenStyle";

export class PreloadScreenStyle {
    public static SCREEN_LIGHT_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY, {});
    public static SCREEN_DARK_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_DARK_STYLES_ONLY, {});
}