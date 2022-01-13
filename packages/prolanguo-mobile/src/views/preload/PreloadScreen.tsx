import React from "react";
import { observer } from "mobx-react";
import { ActivityIndicator, Text } from "react-native";
import { Screen } from "../common/Screen";
import { ObservableScreen, ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { preloadScreenIds } from "../../constants/ids/PreloadScreenIds";
import { DefaultText } from "../common/DefaultText";


// all ObservableScreens extends ObservableScreen
export interface PreloadScreenProps {
    observableScreen: ObservablePreloadScreen,
    shouldRenderMessage: boolean,
}

@observer
export class PreloadScreen extends React.Component<PreloadScreenProps>{
    public render(): React.ReactElement<any> {
        return(
            <Screen
                testID={preloadScreenIds.SCREEN}
                observableScreen={this.props.observableScreen} //pass this value
                useSafeAreaView={true}
            >
                <ActivityIndicator color="black" />
                <DefaultText>
                    { this.props.shouldRenderMessage === true ? 
                    this.props.observableScreen.message : "" }
                    a message
                </DefaultText>
                <Text> Hello world !! {this.props.observableScreen.screenLayout.height}</Text>
            </Screen>
        )
    }
}