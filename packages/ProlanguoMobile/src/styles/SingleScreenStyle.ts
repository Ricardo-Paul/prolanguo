import { darkStyles as topBarDefaultDarkStyles, lightStyles as topBarDefaultLightStyles } from "../views/top-bar/TopBar.style";
import * as _ from "lodash";
import { config } from "../constants/config";

export class SingleScreenStyle {
   public static SCREEN_BASE_STYLES_ONLY = {
       statusBar: {
           backgroundColor: config.styles.darkPrimaryColor
       },
       topBar: {
            visible: true, 
           noBorder: true,
        background: {
            color: config.styles.primaryColor
        },
        elevation: 0, // remove topbar shadow for single screens
       },
       layout: {
           backgroundColor: config.styles.primaryColor
       }
   }
   public static SCREEN_LIGHT_STYLES_ONLY = {};
   public static SCREEN_DARK_STYLES_ONLY = {};

   public static TOP_BAR_LIGHT_STYLES = _.merge({}, topBarDefaultLightStyles, {});
   public static TOP_BAR_DARK_STYLES = _.merge({}, topBarDefaultDarkStyles, {});
}