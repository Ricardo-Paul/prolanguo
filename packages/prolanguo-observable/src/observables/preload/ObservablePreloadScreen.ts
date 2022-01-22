import { ObservableScreen } from "../screen/ObservableScreen";
import { observable } from "mobx";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";

export class ObservablePreloadScreen extends ObservableScreen {
    
    @observable
    public message: string;

    public constructor(
        message: string,
        componentId: string,
        screenName: ScreenName
    ){
        super(componentId, screenName, null);
        this.message = message;
    }
}