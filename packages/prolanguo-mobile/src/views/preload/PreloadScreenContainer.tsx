import * as React from "react";
import { PreloadScreen } from "./PreloadScreen";
import { observer, Observer } from "mobx-react";
import { Container } from "../../Container";
// import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { ScreenName, Theme } from "@prolanguo/prolanguo-common/enums";
import { PreloadScreenFactory } from "../../factories/preload/PreloadScreenFactory";
import { PreloadScreenStyle } from "./PreloadScreenContainer.style";
import { View, Text } from "react-native";
import { observable, makeObservable } from "mobx";

class ObservablePreloadScreen{

    public message: string = ""

    constructor(message: string){
        makeObservable(this, {
            message: observable
        });

        this.message = message;
    }
}

// const person = observable({ name: "John" })
const screen = new ObservablePreloadScreen("init message");



@observer
export class PreloadScreenContainer extends Container {
    constructor(props: any){
        super(props)
        this.state = {
            myMessage: "HiMess"
        }
    }
    protected observableScreen = new ObservablePreloadScreen(
        'changed ...', 
        // this.props.componentId, 
        // ScreenName.PRELOAD_SCREEN
    );

    private screenFactory = new PreloadScreenFactory(
        this.props,
        this.eventBus
    );
    private navigatorDelegate = this.screenFactory.createNavigatorDelegate();
    // private screenDelegate = this.screenFactory.createScreenDelegate(
    //     this.observableScreen
    // );

    componentDidMount(){
        console.log("access props from screen container :", this.props.eventBusFactory);
        console.log("Preload screen initial message :", this.observableScreen.message);
        // this.screenDelegate.autoUpdateMessage();
        // this.screenDelegate.preload();
        let count = 1
        // setInterval(() => {
        //     //for component to re-render we should trigger setState here, BUG
        //     this.observableScreen.message = "new message";
        //     console.log("resetting message :", this.observableScreen.message)
        // }, 2000);
    }

    // wrapped inside a mobx reaction, in extendContainer > ComponentDidMount
    public onThemeChanged(theme: Theme): void{ 
        this.navigatorDelegate.mergeOptions(
            theme === Theme.LIGHT
            ? PreloadScreenStyle.SCREEN_LIGHT_STYLES_ONLY
            : PreloadScreenStyle.SCREEN_DARK_STYLES_ONLY
        );
    };


    render(){
        console.log("observable message from render()", this.observableScreen.message)
        return(
            // <PreloadScreen 
            //     observableScreen={this.observableScreen} 
            //     shouldRenderMessage={true}
            //     themeStore={this.props.rootStore.themeStore}
            //     />
            <View>
               <Text> { screen.message } </Text>
            </View>
        )
    }
}



// let observableScreen = new ObservablePreloadScreen("Hmm", "id", ScreenName.PRELOAD_SCREEN)
// export const PPreloadScreenContainer = observer(() => {
//     return (
//         <View>
//             <Text> { observableScreen.message} </Text>
//         </View>
//     )
// })

setInterval(() => {
    let date = new Date()
    screen.message = `new message here ${date.toUTCString()}`
    console.log("the new message", screen.message, )
}, 3000)