import React from "react";
import { observer } from "mobx-react";
import { ActivityIndicator, Text } from "react-native";
import { Screen } from "../common/Screen";
import { ObservableScreen, ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";




// all ObservableScreens extends ObservableScreen
export interface PreloadScreenProps {
    observableScreen: ObservablePreloadScreen
}

@observer
export class PreloadScreen extends React.Component<PreloadScreenProps>{
    public render(): React.ReactElement<any> {
        return(
            <Screen
                observableScreen={this.props.observableScreen} //pass this value
                useSafeAreaView={true}
            >
                <ActivityIndicator color="black" />
                <Text> Hello world !! {this.props.observableScreen.screenLayout.height}</Text>
            </Screen>
        )
    }
}