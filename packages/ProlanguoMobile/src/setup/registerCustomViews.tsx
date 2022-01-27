import React from "react";
import { Navigation } from "react-native-navigation";
import { CustomViews } from "../constants/CustomViews";
import { Provider } from "../Provider";
import * as _ from "lodash";

export function registerCustomViews(): void{
    console.log("Registering custom views ...")
    _.forOwn(
        CustomViews,
        (container, screenName): void => {
            const Child = container
            Navigation.registerComponent(screenName, () =>  (props) => 
                <Provider>
                    <Child {...props} />
                </Provider>,
                () => Child
            )
        }
    )
};