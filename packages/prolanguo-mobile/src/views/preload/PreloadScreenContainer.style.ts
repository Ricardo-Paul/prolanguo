// based on singleScreenStyle
import * as _ from "lodash";
import { SingleScreenStyle } from "../../styles/SingleScreenStyle";

export class PreloadScreenStyle {
    public static SCRENN_BASE_STYLES_ONLY = _.merge(
        {},
        SingleScreenStyle.SCREEN_BASE_STYLES_ONLY,
        {}
    );
    
    // light or dark only
    public static SCREEN_LIGHT_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY, {});
    public static SCREEN_DARK_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_DARK_STYLES_ONLY, {});

    // full light = base styles + light only styles
    public static SCREEN_FULL_LIGHT_STYLES = _.merge(
        {},
        SingleScreenStyle.SCREEN_BASE_STYLES_ONLY,
        SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY
    );

    // full dark = base styles + dark only styles
    public static SCREEN_FULL_DARK_STYLES = _.merge(
        {},
        SingleScreenStyle.SCREEN_BASE_STYLES_ONLY,
        SingleScreenStyle.SCREEN_DARK_STYLES_ONLY
    )
}