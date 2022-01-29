"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenFactory = void 0;
const AuthDelegate_1 = require("../../delegates/auth/AuthDelegate");
const WelcomeScreenDelegate_1 = require("../../delegates/welcome/WelcomeScreenDelegate");
const ScreenFactory_1 = require("../ScreenFactory");
class WelcomeScreenFactory extends ScreenFactory_1.ScreenFactory {
    createScreenDelegate() {
        const authDelegate = new AuthDelegate_1.AuthDelegate(this.eventBus);
        return new WelcomeScreenDelegate_1.WelcomeScreenDelegate(authDelegate);
    }
}
exports.WelcomeScreenFactory = WelcomeScreenFactory;
;
