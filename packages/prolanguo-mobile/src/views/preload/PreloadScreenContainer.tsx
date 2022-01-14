import React from "react";
import { PreloadScreen } from "./PreloadScreen";
import { observer } from "mobx-react";
import { Container } from "../../Container";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { ScreenName } from "@prolanguo/prolanguo-common/enums";
import { PreloadScreenFactory } from "../../factories/preload/PreloadScreenFactory";
import { Theme } from "../../utils/responsive";
import { PreloadScreenStyle } from "./PreloadScreenContainer.style";

@observer
export class PreloadScreenContainer extends Container {
    protected observableScreen = new ObservablePreloadScreen('', this.props.componentId, ScreenName.PRELOAD_SCREEN);
    private screenFactory = new PreloadScreenFactory(this.props);
    private navigatorDelegate = this.screenFactory.createNavigatorDelegate();

    componentDidMount(){
        console.log("Preload screen container mounted")
    }

    public onThemeChanged(theme: Theme): void{
        this.navigatorDelegate.mergeOptions(
            theme === Theme.LIGHT
            ? PreloadScreenStyle.SCREEN_LIGHT_STYLES_ONLY
            : PreloadScreenStyle.SCREEN_DARK_STYLES_ONLY
        );
    };

    public render(): React.ReactElement<any> {
        return(
            <PreloadScreen 
                observableScreen={this.observableScreen} 
                shouldRenderMessage={false}
                // themeStore={} //this.props.rootStore.themeStore
                />
        )
    }
}