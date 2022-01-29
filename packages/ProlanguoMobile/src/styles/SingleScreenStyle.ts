import { darkStyles as topBarDefaultDarkStyles, lightStyles as topBarDefaultLightStyles } from "../views/top-bar/TopBar.style";
import * as _ from "lodash";

// TODO: move to config file
const darkPrimaryColor = "#001d55"; // will be replaced by a darker alternative for the status bar
const primaryColor = "#001d55"

export class SingleScreenStyle {
   public static SCREEN_BASE_STYLES_ONLY = {
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
   }
   public static SCREEN_LIGHT_STYLES_ONLY = {};
   public static SCREEN_DARK_STYLES_ONLY = {};

   public static TOP_BAR_LIGHT_STYLES = _.merge({}, topBarDefaultLightStyles, {});
   public static TOP_BAR_DARK_STYLES = _.merge({}, topBarDefaultDarkStyles, {});
}