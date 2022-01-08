import { ScreenContainers } from "../constants/ScreenContainers";
import { Navigation } from "react-native-navigation";
import * as _ from "lodash";

// here the screens are registered on the Navigator
// we're using react-native-navigation from wix

// study how this method is built
export function extendContainer(constructor: any){
    return constructor
}

const Provider;

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