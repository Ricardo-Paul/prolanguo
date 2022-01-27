import { ScreenName } from "@prolanguo/prolanguo-common/dist/enums";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { PreloadScreenDelegate } from "../../delegates/preload/PreloadScreenDelegate";
import { ScreenFactory } from "../ScreenFactory";


export class PreloadScreenFactory extends ScreenFactory {
    public createScreenDelegate(
        observableScreen: ObservablePreloadScreen
    ): PreloadScreenDelegate{

        const navigatorDelegate = this.createNavigatorDelegate();

        return new PreloadScreenDelegate(
            navigatorDelegate,
            this.eventBus,
            observableScreen
        );
    }
};
