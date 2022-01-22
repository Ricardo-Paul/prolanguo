import { ActionType, ActionPayload, createAction } from "@prolanguo/prolanguo-action";
import { EventBus, group, once, on, EventListener } from "@prolanguo/prolanguo-event";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { NavigatorDelegate } from "../navigator/NavigatorDelegate";

export class PreloadScreenDelegate {
  private navigatorDelegate: NavigatorDelegate;
  private eventBus: EventBus;
  private observableScreen: ObservablePreloadScreen;

  public constructor(
    navigatorDelegate: NavigatorDelegate,
    eventBus: EventBus,
    observableScreen: ObservablePreloadScreen,
    localState: object
  ) {
    this.navigatorDelegate = navigatorDelegate;
    this.eventBus = eventBus;
    this.observableScreen = observableScreen;
  }

  public autoUpdateMessage(): void {
    console.log("Fire update message, registering callbacks");
    const messageMap = [
      [ActionType.APP__INITIALIZING, "Initializing..."],
      [ ActionType.APP__INITIALIZE_SUCCEEDED, "App successfully initialized!" ]
    ];

    this.eventBus.subscribe(on(ActionType.APP__INITIALIZING, () => {
      this.observableScreen.message = "Initializing prolanguo..."
      console.log("new message for observable screen", this.observableScreen.message)
    }))
  }; 

  public preload(): void {
    console.log("Calling preload func")
    this.initializeApp()
  }


  private initializeApp(){
    console.log("firing APP_INI event")
    this.eventBus.publish(createAction(ActionType.APP__INITIALIZING, null));
    console.log("INIT APP next observable screen message", this.observableScreen.message)
  }

}