import { ObservableSignUpScreen } from "@prolanguo/prolanguo-observable";
import React from "react";
import { View , Text} from "react-native";


export interface SignUpScreenProps {
    observableScreen: ObservableSignUpScreen
}

// make use of the observable 
export class SignUpScreen extends React.Component<SignUpScreenProps>{
    public render(){
        return (
            <View>
                <Text> Hello there</Text>
            </View>
        )
    }
};