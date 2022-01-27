import { SingleScreenStyle } from "../../styles/SingleScreenStyle";
import * as _ from "lodash";
import { useCustomTopBar } from "../../utils/useCustomTopBar";
import { ScreenName } from "@prolanguo/prolanguo-common/dist/enums";


export class WelcomeScreenStyle {
  public static SCREEN_BASE_STYLES_ONLY = _.merge(
    {},
    SingleScreenStyle.SCREEN_BASE_STYLES_ONLY,
    { //we'll pass a component as the topbar title
      topBar: useCustomTopBar({
        screenName: ScreenName.WELCOME_SCREEN,
        styles: {
          light: SingleScreenStyle.TOP_BAR_LIGHT_STYLES,
          dark: SingleScreenStyle.TOP_BAR_DARK_STYLES
        }
      })
    },
  );

  static SCREEN_LIGHT_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_LIGHT_STYLES_ONLY, {});
  static SCREEN_DARK_STYLES_ONLY = _.merge({}, SingleScreenStyle.SCREEN_DARK_STYLES_ONLY, {});

  static FULL_LIGHT_STYLES = _.merge({}, WelcomeScreenStyle.SCREEN_LIGHT_STYLES_ONLY,
    WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY);

  static FULL_DARK_STYLES = _.merge({}, WelcomeScreenStyle.SCREEN_DARK_STYLES_ONLY,
    WelcomeScreenStyle.SCREEN_BASE_STYLES_ONLY);
};
