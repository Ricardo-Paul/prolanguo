import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { registerScreens } from './setup/registerScreens';
// import { Navigation } from "react-native-navigation";
import { Navigation } from "@ulangi/react-native-navigation";
import { HomeScreen } from "./HomeScreen"



class App {
  private initialized: boolean;

  constructor(){
    this.initialized = false;
  }

  public start(): void{
    console.log("App runs")
    Navigation.registerComponent('ProlanguoMobile.Home', () => HomeScreen);

    Navigation.events().registerAppLaunchedListener(async () => {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'ProlanguoMobile.Home'
                }
              }
            ]
          }
        }
      });
    });
  }

  // register screens, services, run saga
  private init():void{
    // registerScreens();
    this.initialized = true;
  };

  private render(): void{
    
  }

}

export default App;