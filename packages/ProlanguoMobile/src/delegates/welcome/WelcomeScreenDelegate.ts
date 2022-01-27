import { AuthDelegate } from "../auth/AuthDelegate"

export class WelcomeScreenDelegate{

    private authDelegate: AuthDelegate;
    constructor(authDelegate: AuthDelegate){
        this.authDelegate = authDelegate;
    }

    public signInAsGuest(){
        console.log("Signing in as guest ...");
        this.authDelegate.signInAsGuest({
            signinInAsGuest: () => this.showSigningInAsGuestDialog(),
            onSignInAsGuestSucceeded: (userPayload: object): void => {
                console.log("received the message :", userPayload)
            },
            onSignInAsGuestFailed: ():void =>{}
        })
    };

    private showSigningInAsGuestDialog(): void{

    }
}