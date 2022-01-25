import * as React from "react";
import { PreloadScreen } from "./PreloadScreen";
import { observer, Observer } from "mobx-react";
import { Container, ContainerProps } from "../../Container";
import { ObservablePreloadScreen } from "@prolanguo/prolanguo-observable";
import { ScreenName, Theme } from "@prolanguo/prolanguo-common/enums";
import { PreloadScreenFactory } from "../../factories/preload/PreloadScreenFactory";
import { PreloadScreenStyle } from "./PreloadScreenContainer.style";
import { View, Text } from "react-native";
import { Options } from "@ulangi/react-native-navigation";
import { Navigation, NavigationComponent } from "react-native-navigation";

@observer
export class PreloadScreenContainer extends Container{

    // screen default styles
    public static options(props: ContainerProps): Options{
      return props.theme === Theme.LIGHT ? PreloadScreenStyle.SCREEN_FULL_LIGHT_STYLES
        : PreloadScreenStyle.SCREEN_FULL_DARK_STYLES
    }

  protected observableScreen = new ObservablePreloadScreen(
    '',
    this.props.componentId,
    ScreenName.PRELOAD_SCREEN
  );

  private screenFactory = new PreloadScreenFactory(
    this.props,
    this.eventBus
  );
  private navigatorDelegate = this.screenFactory.createNavigatorDelegate();
  private screenDelegate = this.screenFactory.createScreenDelegate(
    this.observableScreen
  );

  componentDidMount() {
    console.log("Event facade :", this.props.eventBusFactory)
    this.screenDelegate.autoUpdateMessage();
    this.screenDelegate.preload();
  }

  // wrapped inside a mobx reaction, in extendContainer > ComponentDidMount
  public onThemeChanged(theme: Theme): void {
    this.navigatorDelegate.mergeOptions(
      theme === Theme.LIGHT
        ? PreloadScreenStyle.SCREEN_LIGHT_STYLES_ONLY
        : PreloadScreenStyle.SCREEN_DARK_STYLES_ONLY
    );
  };

  render() {
    return(
      <PreloadScreen
        observableScreen={this.observableScreen}
        shouldRenderMessage={true}
        themeStore={this.props.rootStore.themeStore}
      />
    )
  }
}