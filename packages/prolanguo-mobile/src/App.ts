// import React from 'react';
import { registerScreens } from './setup/registerScreens';
import { Navigation } from "react-native-navigation";
import { HomeScreen } from "./HomeScreen";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";



class App {
  private initialized: boolean;

  constructor(){
    this.initialized = false;
  }

  public start(): void{
    console.log("App runs")
    Navigation.events().registerAppLaunchedListener(async () => { 
      if(!this.initialized){
        this.init();
      }

      this.render();
    });
  }

  // register screens, services, run saga
  private init():void{
    registerScreens();
    // Navigation.registerComponent('ProlanguoMobile.Home', () => HomeScreen);
    this.initialized = true;
  };

  private render(): void{
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: ScreenName.WELCOME_SCREEN
              }
            }
          ]
        }
      }
    });
  }
}

export default App;