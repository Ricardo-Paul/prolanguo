import { NavigatorDelegate } from "../delegates/navigator/NavigatorDelegate";
import { ContainerProps } from "../Container";


export class ScreenFactory{
    protected props: ContainerProps;

    constructor(props: ContainerProps){
        this.props = props;
    }

    public createNavigatorDelegate(): NavigatorDelegate{
        return new NavigatorDelegate(
            this.props.componentId
        )
    }
}