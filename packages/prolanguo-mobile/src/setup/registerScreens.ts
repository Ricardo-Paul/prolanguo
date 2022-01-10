import { ScreenContainers } from "../constants/ScreenContainers";
import * as _ from "lodash";
import { Provider } from "../Provider";
import { extendContainer } from "../decorators/extendContainer";
import { Navigation } from "react-native-navigation"



export function registerScreens(): void{
    _.forOwn(
        ScreenContainers,
        (container, screenName): void => {
            Navigation.registerComponentWithRedux(
                screenName,
                () => extendContainer(container),
                Provider,
                null
            )
        }
    )
};