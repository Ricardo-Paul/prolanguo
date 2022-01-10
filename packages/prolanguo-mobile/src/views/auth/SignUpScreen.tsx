import { ObservableSignUpScreen } from "@prolanguo/prolanguo-observable";
import React from "react";
import { View , Text} from "react-native";
import { SignUpForm } from "./SignUpForm";


export interface SignUpScreenProps {
    observableScreen: ObservableSignUpScreen
}

// make use of the observable 
export class SignUpScreen extends React.Component<SignUpScreenProps>{
    public render(){
        return (
            <View>
                <Text> Signup screen</Text>
                <SignUpForm />
            </View>
        )
    }
};