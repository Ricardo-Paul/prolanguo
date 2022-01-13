import { ObservableScreen } from "@prolanguo/prolanguo-observable";
import React from "react";
import { GestureResponderEvent, Keyboard, LayoutChangeEvent, SafeAreaView, View, ViewProps } from "react-native";

interface ScreenProps extends ViewProps {
    observableScreen: ObservableScreen; //values for the screen component
    useSafeAreaView?: boolean;
    useDismissKeyBoardView?: boolean;
}

// screen is a wrapper around View/SafeAreaView
export class Screen extends React.Component<ScreenProps> {
    private onLayout(event: LayoutChangeEvent):void {
        const { width, height } = event.nativeEvent.layout;
        this.props.observableScreen.screenLayout.update(width, height);
    }

    // this will dismiss the keyboard on touch
    private onStartShouldSetResponder():boolean{
        return true;
    };

    // the keyboard won't be dismissed when scrolling
    private onMoveShouldSetResponder():boolean{
        return false;
    }

    private onResponderRelease(event: GestureResponderEvent): void{
        Keyboard.dismiss();
        if(typeof this.props.onResponderRelease !== 'undefined'){
            this.props.onResponderRelease(event);
        }
    }

    public render(): null | React.ReactElement<any> {
        const props = this.props.useDismissKeyBoardView === true ?
            {
                ...this.props,
                onStartShouldSetResponder: this.onStartShouldSetResponder,
                onMoveShouldSetResponder: this.onMoveShouldSetResponder,
                onResponderRelease: this.onResponderRelease 
            } : this.props;

        if(this.props.useSafeAreaView === true){
            return (
                <SafeAreaView onLayout={this.onLayout.bind(this)} {...props}>
                    { this.renderChildren() }
                </SafeAreaView>
            )
        } else {
            return (
                <View onLayout={this.onLayout.bind(this)} {...props} >
                    { this.renderChildren() }
                </View>
            )
        }
    };

    // bind the methods to the class
    private renderChildren(): React.ReactNode{
        console.log("Screen Height here: ", this.props.observableScreen.screenLayout.height )
        console.log("Observable Screen type :", typeof this.props.observableScreen);
        if(
            this.props.observableScreen.screenLayout.height &&
            this.props.observableScreen.screenLayout.width
        ){
            return this.props.children
        } else {
            return null
        }
    }
}