import { NavigatorDelegate } from "../delegates/navigator/NavigatorDelegate";
import { ContainerProps } from "../Container";
import { EventBus } from "@prolanguo/prolanguo-event/dist/EventBus";
import { ObservableScreen } from "@prolanguo/prolanguo-observable";


export class ScreenFactory{
    protected props: ContainerProps;
    protected eventBus: EventBus;

    constructor(
        props: ContainerProps,
        eventBus: EventBus,
    ){
        this.props = props;
        this.eventBus = eventBus;
    }

    public createNavigatorDelegate(): NavigatorDelegate{
        return new NavigatorDelegate(
            this.props.componentId
        )
    }
}