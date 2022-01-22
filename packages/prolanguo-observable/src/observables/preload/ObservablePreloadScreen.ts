import { ObservableScreen } from "../screen/ObservableScreen";
import { observable, makeObservable } from "mobx";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";

export class ObservablePreloadScreen extends ObservableScreen{

  @observable message: string = "";

  constructor(
    message: string,
    componentId: string,
    screenName: ScreenName
  ) {
    super(componentId, screenName, null);

    makeObservable(this);

    this.message = message;
  }
}