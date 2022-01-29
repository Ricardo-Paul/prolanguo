"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenDelegate = void 0;
class WelcomeScreenDelegate {
    constructor(authDelegate) {
        this.authDelegate = authDelegate;
    }
    signInAsGuest() {
        console.log("Signing in as guest ...");
        this.authDelegate.signInAsGuest({
            signinInAsGuest: () => this.showSigningInAsGuestDialog(),
            onSignInAsGuestSucceeded: (userPayload) => {
                console.log("received the message :", userPayload);
            },
            onSignInAsGuestFailed: () => { }
        });
    }
    ;
    showSigningInAsGuestDialog() {
    }
}
exports.WelcomeScreenDelegate = WelcomeScreenDelegate;
