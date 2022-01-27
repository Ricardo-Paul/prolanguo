import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { OptionsTopBar } from "react-native-navigation";
import * as _ from "lodash";
import { CustomViews } from "../constants/CustomViews";


interface TopBarPassedProps {
  readonly screenName: ScreenName,
  readonly styles: {
    readonly light: any,
    readonly dark: any
  }
}

export function useCustomTopBar(
  options: OptionsTopBar & {
    screenName: ScreenName,
    styles: {
      light: any,
      dark: any
    }
  }
): OptionsTopBar {
  return _.merge(
    { // we're using a component as the topbar title
      title:{
        component: {
          name: CustomViews.TOP_BAR,
          alignment: 'fill',
          passProps: {
            get passProps(): TopBarPassedProps{
              return {
                screenName: options.screenName,
                styles: options.styles
              }
            }
          }
        }
      }
      // hide back button
    }
  )
}