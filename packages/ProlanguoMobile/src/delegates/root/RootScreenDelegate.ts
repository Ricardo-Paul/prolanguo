import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { Navigation } from "react-native-navigation";
import { BottomTabIds } from "../../constants/ids/BottomTabIds";


export class RootScreenDelegate {
  // state for theme
  private themeStore: any;

  public constructor(themeStore: any) {
    this.themeStore = themeStore;
  };

  public setRootToSingleScreen(screenName: ScreenName) {
    const theme = this.themeStore.theme;
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screenName,
                passProps: { theme },
              }
            }
          ]
        }
      }
    })
  };

  public setRootToTabBasedScreen(screenName: ScreenName) {
    const theme = this.themeStore.theme;
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: BottomTabIds.CONTAINER,
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: ScreenName.MANAGE_SCREEN,
                      passProps: { theme }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    testID: BottomTabIds.MANAGE_BTN,
                    text: 'Manage',
                    icon: 'get an icon',
                    selectedIcon: 'get a selected icon'
                  }
                }
              }
            },
            // add other stacks for bottom tabs
          ]
        }
      }
    })
  }
}