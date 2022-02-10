"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import React from 'react';
const registerScreens_1 = require("./setup/registerScreens");
const react_native_navigation_1 = require("react-native-navigation");
const enums_1 = require("@prolanguo/prolanguo-common/enums");
const RootScreenDelegate_1 = require("./delegates/root/RootScreenDelegate");
const ServiceRegistry_1 = require("./ServiceRegistry");
const prolanguo_store_1 = require("@prolanguo/prolanguo-store");
const makeInitialState_1 = require("./setup/makeInitialState");
const prolanguo_saga_1 = require("@prolanguo/prolanguo-saga");
const prolanguo_event_1 = require("@prolanguo/prolanguo-event");
const registerCustomViews_1 = require("./setup/registerCustomViews");
const AdapterFactory_1 = require("./factories/AdapterFactory");
// put that in config
const env = {
    ENABLE_REDUX_LOGGING: true
};
class App {
    constructor() {
        this.initialized = false;
        this.preloaded = false;
    }
    start() {
        console.log("App has started >>>");
        react_native_navigation_1.Navigation.events().registerAppLaunchedListener(() => __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized()) {
                this.init();
            }
            this.render();
        }));
    }
    // register screens, services, run saga
    init() {
        (0, registerScreens_1.registerScreens)();
        (0, registerCustomViews_1.registerCustomViews)();
        // make initial state to build the store
        // pass middleware for saga and event to the store.
        const adapters = new AdapterFactory_1.AdapterFactory().createAdapters();
        console.log("adapter in app.ts :", adapters.sqliteDatabase);
        const sagaFacade = new prolanguo_saga_1.SagaFacade({}, adapters.sqliteDatabase);
        const eventFacade = new prolanguo_event_1.EventFacade();
        const storeFactory = new prolanguo_store_1.StoreFactory({
            enableLogging: env.ENABLE_REDUX_LOGGING
        }, [sagaFacade.getMiddleware(), eventFacade.getMiddleware()]);
        // we only consume the .getState() method 
        // we manage pub sub through the event bus
        const store = storeFactory.createStore((0, makeInitialState_1.makeInitialState)());
        ServiceRegistry_1.ServiceRegistry.registerAll({
            rootStore: store.getState(),
            eventBusFactory: new prolanguo_event_1.EventBusFactory(store, eventFacade)
            // register the rootstore here
            // goal is to get the theme global state from the store
            // to use in componentDidMount in extendContainer decorator
            // in a mobx reaction that re-render the component when the theme changes
        });
        sagaFacade.run();
        // dispatch an action and run both middleware
        // const eventBus = new EventBusFactory(store, eventFacade).createBus();
        // eventBus.publish(createAction("APP__INITIALIZE_SUCCEEDED", null));
        this.initialized = true;
    }
    ;
    // setting root screen accordingly
    render() {
        // const { themeStore, userStore } = ServiceRegistry.services.rootStore;
        // get the themestore from service registry
        const rootScreenDelegate = new RootScreenDelegate_1.RootScreenDelegate(0); //fake value here
        if (!this.isPreloaded()) {
            this.preloaded = true;
            rootScreenDelegate.setRootToSingleScreen(enums_1.ScreenName.PRELOAD_SCREEN);
        }
        else {
            rootScreenDelegate.setRootToSingleScreen(enums_1.ScreenName.WELCOME_SCREEN);
        }
    }
    ;
    isPreloaded() {
        return this.preloaded;
    }
    ;
    isInitialized() {
        return this.initialized;
    }
}
exports.default = App;
