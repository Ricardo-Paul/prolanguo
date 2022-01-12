import { ScreenContainers } from "../constants/ScreenContainers";
import * as _ from "lodash";
import { extendContainer } from "../decorators/extendContainer";
import { Navigation } from "react-native-navigation";
import {Provider } from "../Provider";

export function registerScreens(): void{
    _.forOwn(
        ScreenContainers,
        (container, screenName): void => {
            Navigation.registerComponentWithRedux(
                screenName,
                () => container, //extend the container
                Provider,
                null
            )
        }
    )
};