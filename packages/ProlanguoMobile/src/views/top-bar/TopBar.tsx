import React from "react";
import { View, Text } from "react-native";
import { lightStyles, darkStyles } from "./TopBar.style";



export class TopBar extends React.Component<{}>{
    render(): React.ReactNode {
        return(
            <View style={lightStyles.topBarContainer}>
                <Text>
                    Top bar
                </Text>
            </View>
        )
    }
}