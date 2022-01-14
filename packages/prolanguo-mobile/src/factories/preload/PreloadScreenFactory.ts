import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { NavigatorDelegate } from "../../delegates/navigator/NavigatorDelegate";
import { PreloadScreenDelegate } from "../../delegates/preload/PreloadScreenDelegate";
import { ScreenFactory } from "../ScreenFactory";

export class PreloadScreenFactory extends ScreenFactory {
    public createScreenDelegate(): PreloadScreenDelegate{
        const navigatorDelegate = this.createNavigatorDelegate();

        return new PreloadScreenDelegate(
            navigatorDelegate
        );
    }
};
