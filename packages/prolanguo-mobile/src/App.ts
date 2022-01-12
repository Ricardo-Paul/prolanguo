// import React from 'react';
import { registerScreens } from './setup/registerScreens';
import { Navigation } from "react-native-navigation";
import { HomeScreen } from "./HomeScreen";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { RootScreenDelegate } from './delegates/root/RootScreenDelegate';

class App {
  private initialized: boolean;
  private preloaded: boolean; //first app screen loaded

  constructor(){
    this.initialized = false;
    this.preloaded = false;
  }

  public start(): void{
    console.log("App runs")
    Navigation.events().registerAppLaunchedListener(async () => { 
      if(!this.isInitialized()){
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

  // setting root screen accordingly
  private render(): void{

    // get the themestore from service registry
    const rootScreenDelegate = new RootScreenDelegate(0); //fake value here
    if(!this.isPreloaded()){
      this.preloaded = true;
      rootScreenDelegate.setRootToSingleScreen(ScreenName.PRELOAD_SCREEN);
    } else {
      // use values from the rootStore to set screen accordingly
    }
  };

  private isPreloaded():boolean{
    return this.preloaded;
  };

  private isInitialized():boolean{
    return this.initialized;
  }
}

export default App;