"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadScreenDelegate = void 0;
const prolanguo_action_1 = require("@prolanguo/prolanguo-action");
const prolanguo_event_1 = require("@prolanguo/prolanguo-event");
const mobx_1 = require("mobx");
const enums_1 = require("@prolanguo/prolanguo-common/enums");
class PreloadScreenDelegate {
    constructor(navigatorDelegate, eventBus, observableScreen) {
        this.navigatorDelegate = navigatorDelegate;
        this.eventBus = eventBus;
        this.observableScreen = observableScreen;
    }
    autoUpdateMessage() {
        const messageMap = [
            [prolanguo_action_1.ActionType.APP__INITIALIZING, "Initializing..."],
            // [ ActionType.APP__INITIALIZE_SUCCEEDED, "App successfully initialized!" ]
        ];
        this.eventBus.subscribe((0, prolanguo_event_1.group)(...messageMap.map(([actionType, message]) => {
            return (0, prolanguo_event_1.on)(actionType, () => {
                (0, mobx_1.runInAction)(() => {
                    this.observableScreen.message = message;
                });
            });
        })));
    }
    ;
    onInitSucceededOrAlreadyInit() {
        this.navigateToWelcomeScreen();
    }
    preload() {
        this.eventBus.pubsub((0, prolanguo_action_1.createAction)(prolanguo_action_1.ActionType.APP__INITIALIZE, null), (0, prolanguo_event_1.group)((0, prolanguo_event_1.once)(prolanguo_action_1.ActionType.APP__INITIALIZE_SUCCEEDED, () => {
            this.navigateToWelcomeScreen();
        })));
    }
    initializeApp() {
        this.navigateToWelcomeScreen();
    }
    ;
    navigateToWelcomeScreen() {
        this.navigatorDelegate.resetTo(enums_1.ScreenName.WELCOME_SCREEN);
    }
}
exports.PreloadScreenDelegate = PreloadScreenDelegate;
