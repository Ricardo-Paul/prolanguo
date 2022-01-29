"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootScreenDelegate = void 0;
const enums_1 = require("@prolanguo/prolanguo-common/enums");
const react_native_navigation_1 = require("react-native-navigation");
const BottomTabIds_1 = require("../../constants/ids/BottomTabIds");
class RootScreenDelegate {
    constructor(themeStore) {
        this.themeStore = themeStore;
    }
    ;
    setRootToSingleScreen(screenName) {
        const theme = this.themeStore.theme;
        react_native_navigation_1.Navigation.setRoot({
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
        });
    }
    ;
    setRootToTabBasedScreen(screenName) {
        const theme = this.themeStore.theme;
        react_native_navigation_1.Navigation.setRoot({
            root: {
                bottomTabs: {
                    id: BottomTabIds_1.BottomTabIds.CONTAINER,
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: enums_1.ScreenName.MANAGE_SCREEN,
                                            passProps: { theme }
                                        }
                                    }
                                ],
                                options: {
                                    bottomTab: {
                                        testID: BottomTabIds_1.BottomTabIds.MANAGE_BTN,
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
        });
    }
}
exports.RootScreenDelegate = RootScreenDelegate;
