import { ActionType, ActionPayload, createAction } from "@prolanguo/prolanguo-action";
import { EventBus, group, once, on, EventListener } from "@prolanguo/prolanguo-event";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { NavigatorDelegate } from "../navigator/NavigatorDelegate";
import { runInAction } from "mobx";

export class PreloadScreenDelegate {
  private navigatorDelegate: NavigatorDelegate;
  private eventBus: EventBus;
  private observableScreen: ObservablePreloadScreen;

  public constructor(
    navigatorDelegate: NavigatorDelegate,
    eventBus: EventBus,
    observableScreen: ObservablePreloadScreen,
  ) {
    this.navigatorDelegate = navigatorDelegate;
    this.eventBus = eventBus;
    this.observableScreen = observableScreen;
  }

  public autoUpdateMessage(): void {
    const messageMap = [
      [ActionType.APP__INITIALIZING, "Initializing..."],
      [ ActionType.APP__INITIALIZE_SUCCEEDED, "App successfully initialized!" ]
    ];

    this.eventBus.subscribe(on(ActionType.APP__INITIALIZING, () => {
      runInAction(() => {
        this.observableScreen.message = "Initializing prolanguo..."
      })
    }))
  }; 

  public preload(): void {
    this.initializeApp()
  }


  private initializeApp(){
    this.eventBus.publish(createAction(ActionType.APP__INITIALIZING, null));
  }

}