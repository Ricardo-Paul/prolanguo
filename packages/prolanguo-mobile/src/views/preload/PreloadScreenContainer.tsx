import React from "react";
import { PreloadScreen } from "./PreloadScreen";
import { observer } from "mobx-react";
import { Container } from "../../Container";
import { Text } from "react-native";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";

@observer
export class PreloadScreenContainer extends Container{
    protected observableScreen = new ObservablePreloadScreen('', this.props.componentId, ScreenName.PRELOAD_SCREEN);

    public render(): React.ReactElement<any> {
        console.log("Observable screen", this.observableScreen)
        return(
            <PreloadScreen observableScreen={this.observableScreen} />
        )
    }
}