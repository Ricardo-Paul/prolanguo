import { ObservableRootStore, ObservableUserStore, ObservableThemeStore } from "@prolanguo/prolanguo-observable";
import { Theme, ThemeTrigger } from "@prolanguo/prolanguo-common/enums";


// put this setting in a config.json file in the app root
const defaultThemeSettings = {
    trigger: ThemeTrigger.SYSTEM
}

export function makeInitialState(): ObservableRootStore{
    const userStore = new ObservableUserStore(null);
    const themestore = new ObservableThemeStore(userStore, defaultThemeSettings, Theme.LIGHT);

    return new ObservableRootStore(
        userStore,
        themestore
    )
};

