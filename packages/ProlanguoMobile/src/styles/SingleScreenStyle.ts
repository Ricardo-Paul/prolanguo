
// TODO: move to config file
const darkPrimaryColor = "#0092C7";
const primaryColor = "#009dd6"

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
        // elevation: 0,
       },
       layout: {
           backgroundColor: primaryColor
       }
   }
   public static SCREEN_LIGHT_STYLES_ONLY = {};
   public static SCREEN_DARK_STYLES_ONLY = {};
}