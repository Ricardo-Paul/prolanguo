import { Navigation, Options } from "react-native-navigation";
import { ScreenContainers } from "../../constants/ScreenContainers";

export class NavigatorDelegate {
    private componentId: string;

    constructor(componentId: string){
        this.componentId = componentId
    };

    // update screen options
    public mergeOptions(options: any):void{
        Navigation.mergeOptions(this.componentId, options)
    };

    public resetTo<T extends keyof typeof ScreenContainers>(
        screenName: T,
        options?: Options
    ){
        Navigation.setStackRoot(this.componentId, {
            component: {
                name: screenName,
                options
            }
        })
    }
}