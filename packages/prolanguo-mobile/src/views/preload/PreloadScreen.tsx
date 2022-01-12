import React from "react";
import { observer } from "mobx-react";
import { Text } from "react-native";


export interface PreloadScreenProps {

}

export class PreloadScreen extends React.Component<PreloadScreenProps>{
    public render(): React.ReactElement<any> {
        return(
            <Text> Preloaded screen </Text>
        )
    }
}