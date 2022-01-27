import { AuthDelegate } from "../../delegates/auth/AuthDelegate";
import { WelcomeScreenDelegate } from "../../delegates/welcome/WelcomeScreenDelegate";
import { ScreenFactory } from "../ScreenFactory";


export class WelcomeScreenFactory extends ScreenFactory {
    public createScreenDelegate(){
        const authDelegate = new AuthDelegate(
            this.eventBus
        )
        return new WelcomeScreenDelegate(
            authDelegate
        );
    }
};