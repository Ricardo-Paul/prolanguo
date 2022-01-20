// import React from 'react';
import { registerScreens } from './setup/registerScreens';
import { Navigation } from "react-native-navigation";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { RootScreenDelegate } from './delegates/root/RootScreenDelegate';
import { ServiceRegistry } from './ServiceRegistry';
import { StoreFactory } from "@prolanguo/prolanguo-store";
import { makeInitialState } from './setup/makeInitialState';
import { SagaFacade } from "@prolanguo/prolanguo-saga";
import { EventFacade, EventBusFactory } from "@prolanguo/prolanguo-event";

//test
import {Action, createAction } from "@prolanguo/prolanguo-action";

// put that in config
const env = {
    ENABLE_REDUX_LOGGING: true
}

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

    // make initial state to build the store
    // pass middleware for saga and event to the store.
    const sagaFacade = new SagaFacade({});
    const eventFacade = new EventFacade();

    const storeFactory = new StoreFactory(
      {
        enableLogging: env.ENABLE_REDUX_LOGGING
      },
      [sagaFacade.getMiddleware(), eventFacade.getMiddleware() ]
    );

    // we only consume the .getState() method
    // we manage pub sub through the event bus
    const store = storeFactory.createStore(makeInitialState());

    ServiceRegistry.registerAll({
      rootStore: store.getState()
      // register the rootstore here
      // goal is to get the theme global state from the store
      // to use in componentDidMount in extendContainer decorator
      // in a mobx reaction that re-render the component when the theme changes
    });
    sagaFacade.run();

    // trying to dispatch an action
    const eventBus = new EventBusFactory(store, eventFacade).createBus();
    eventBus.publish(createAction("APP__INITIALIZE_SUCCEEDED", null));
  
    this.initialized = true;
  };

  // setting root screen accordingly
  private render(): void{

    // const { themeStore, userStore } = ServiceRegistry.services.rootStore;
    // get the themestore from service registry
    const rootScreenDelegate = new RootScreenDelegate(0); //fake value here
    if(!this.isPreloaded()){
      this.preloaded = true;
      rootScreenDelegate.setRootToSingleScreen(ScreenName.PRELOAD_SCREEN);
    } else {
      rootScreenDelegate.setRootToSingleScreen(ScreenName.WELCOME_SCREEN)
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