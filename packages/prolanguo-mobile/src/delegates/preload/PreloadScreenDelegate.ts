import { NavigatorDelegate } from "../navigator/NavigatorDelegate";

export class PreloadScreenDelegate {
    private navigatorDelegate: NavigatorDelegate;

    public constructor(
        navigatorDelegate: NavigatorDelegate
    ){
        this.navigatorDelegate = navigatorDelegate
    }
}