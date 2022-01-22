import { ScreenContainers } from "../constants/ScreenContainers";
import * as _ from "lodash";
import { extendContainer } from "../decorators/extendContainer";
import { Navigation } from "react-native-navigation";
import { Provider } from "../Provider";
import React from "react";

export function registerScreens(): void{
    _.forOwn(
        ScreenContainers,
        (container, screenName): void => {
            const Child = extendContainer(container);
            Navigation.registerComponent(screenName, () =>  (props) => 
                <Provider>
                    <Child {...props} />
                </Provider>
            )
        }
    )
};