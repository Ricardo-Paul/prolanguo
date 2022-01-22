import React from "react";
import { observer } from "mobx-react";
import { ActivityIndicator, Text, View } from "react-native";
import { Screen } from "../common/Screen";
import { ObservableScreen, ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { preloadScreenIds } from "../../constants/ids/PreloadScreenIds";
import { DefaultText } from "../common/DefaultText";
import { PreloadScreenStyles, 
    preloadScreenResponsiveStyles 
} from "./PreloadScreen.styles";


// all ObservableScreens extends ObservableScreen
export interface PreloadScreenProps {
    observableScreen: ObservablePreloadScreen,
    shouldRenderMessage: boolean,
    themeStore: any //ObservableThemeStore
}

@observer
export class PreloadScreen extends React.Component<PreloadScreenProps>{
    private get styles(): PreloadScreenStyles{
        return preloadScreenResponsiveStyles.compile(
            this.props.observableScreen.screenLayout,
            this.props.themeStore
        )
    };

    public render(): React.ReactElement<any> {
        const screenHeight = this.props.observableScreen.screenLayout.height;
        const screenWidth = this.props.observableScreen.screenLayout.width;
        return(
            <View>
                <Text> { this.props.observableScreen.message } </Text>
            </View>
        )
    }
}