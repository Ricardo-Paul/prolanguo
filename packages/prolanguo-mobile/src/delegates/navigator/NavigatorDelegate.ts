import { Navigation } from "react-native-navigation";

export class NavigatorDelegate {
    private componentId: string;

    constructor(componentId: string){
        this.componentId = componentId
    };

    // add options to a specific screen/component
    public mergeOptions(options: any):void{
        Navigation.mergeOptions(this.componentId, options)
    }
}