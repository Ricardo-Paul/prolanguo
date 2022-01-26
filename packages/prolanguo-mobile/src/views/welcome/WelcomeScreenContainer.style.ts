import { SingleScreenStyle } from "../../styles/SingleScreenStyle";
import * as _ from "lodash";

export class WelcomeScreenStyle {
    static SCREEN_BASE_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_BASE_STYLES_ONLY, {});
    static SCREEN_LIGHT_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY, {});
    static SCREEN_DARK_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_DARK_STYLES_ONLY, {});

    static FULL_LIGHT_STYLES = _.merge({}, WelcomeScreenStyle.SCREEN_LIGHT_STYLES_ONLY, 
        WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY );

    static FULL_DARK_STYLES = _.merge({}, WelcomeScreenStyle.SCREEN_DARK_STYLES_ONLY,
        WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY);
};
