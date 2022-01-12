import React from "react";
import { PreloadScreen } from "./PreloadScreen";
import { observer } from "mobx-react";
import { Container } from "../../Container";
import { Text } from "react-native";

export class PreloadScreenContainer extends Container{
    public render(): React.ReactElement<any>{
        return(
            <PreloadScreen />
        )
    }
}