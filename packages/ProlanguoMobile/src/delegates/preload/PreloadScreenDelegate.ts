import { ActionType, ActionPayload, createAction } from "@prolanguo/prolanguo-action";
import { EventBus, group, once, on, EventListener } from "@prolanguo/prolanguo-event";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { NavigatorDelegate } from "../navigator/NavigatorDelegate";
import { runInAction } from "mobx";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";


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
      // [ ActionType.APP__INITIALIZE_SUCCEEDED, "App successfully initialized!" ]
    ];

    this.eventBus.subscribe(
      group(
        ...messageMap.map(
          ([actionType, message]): EventListener => {
            return on(
              actionType,
              (): void => {
                runInAction(() => {
                  this.observableScreen.message = message;
                })
              },
            );
          },
        ),
      ),
    );
  };

  private onInitSucceededOrAlreadyInit(): void{
    this.navigateToWelcomeScreen()
  }

  public preload(): void{
    this.eventBus.pubsub(
      createAction(ActionType.APP__INITIALIZE, null),
      group(
        once(ActionType.APP__INITIALIZE_SUCCEEDED, () => {
          this.navigateToWelcomeScreen();
        })
      )
    );
  }

  public initializeApp(){
    this.navigateToWelcomeScreen();
  };

  private navigateToWelcomeScreen(){
    this.navigatorDelegate.resetTo(ScreenName.WELCOME_SCREEN);
  }

}