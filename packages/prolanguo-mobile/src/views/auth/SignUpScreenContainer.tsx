import { SignUpScreen } from "./SignUpScreen";


export class Container{

}

export class SignUpScreenContainer extends Container {
    public render(): React.ReactElement<any>{
        return(
            <SignUpScreen />
        );
    }
};