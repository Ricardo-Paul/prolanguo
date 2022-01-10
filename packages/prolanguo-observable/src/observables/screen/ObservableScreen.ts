import { observable } from 'mobx';
import { ObservableTitleTopBar } from '../top-bar/ObservableTitleTopBar';
import { ObservableTouchableTopBar } from '../top-bar/ObservableTouchableTopBar';
import { ObservableScreenLayout } from './ObservableScreenLayout';
import { ScreenName, ScreenState } from "@prolanguo/prolanguo-common/enums";

export class ObservableScreen {
    public readonly componentId: string;

    @observable
    public screenName: ScreenName;

    @observable
    public topBar: null | ObservableTitleTopBar | ObservableTouchableTopBar

    @observable
    public screenState: ScreenState = ScreenState.UNMOUNTED;

    @observable
    public readonly screenLayout: ObservableScreenLayout;

    public constructor(
        componentId: string,
        screenName: ScreenName,
        topBar: null | ObservableTitleTopBar | ObservableTouchableTopBar,
        screenLayout?: ObservableScreenLayout
    ){
        this.componentId = componentId;
        this.screenName = screenName;
        this.topBar = topBar;
        this.screenLayout = screenLayout || new ObservableScreenLayout(0, 0);
    }
}