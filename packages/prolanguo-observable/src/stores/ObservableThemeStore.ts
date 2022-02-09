import { ObservableStore } from "./ObservableStore";
import { observable, computed, action } from "mobx";
import { ObservableUserStore } from "./ObservableUserStore";
import { Theme, ThemeTrigger,  } from "@prolanguo/prolanguo-common/enums";
import { ThemeSettings } from "@prolanguo/prolanguo-common/interfaces";

export class ObservableThemeStore extends ObservableStore {
    private userStore: ObservableUserStore;
    private defaultThemeSettings: ThemeSettings;

    @observable
    systemMode: undefined | Theme

    // returns correct theme according to user system/preference
    @computed
    public get theme(): Theme {
    
        const trigger = this.userStore.currentUser === null ||
            typeof this.userStore.currentUser.themeSettings === 'undefined'
            ? this.defaultThemeSettings.trigger
            : this.userStore.currentUser.themeSettings.trigger

            if (trigger === ThemeTrigger.SYSTEM) {
                return typeof this.systemMode !== 'undefined'
                  ? this.systemMode
                  : Theme.LIGHT;
              } else if (trigger === ThemeTrigger.ALWAYS_DARK) {
                return Theme.DARK;
              } else {
                return Theme.LIGHT;
            }
    }

    public constructor(
        userStore: ObservableUserStore,
        defaultThemeSettings: ThemeSettings,
        systemMode: undefined | Theme
        ){
        super();
        this.userStore = userStore;
        this.systemMode = systemMode;
        this.defaultThemeSettings = defaultThemeSettings;
    };

    @action
    public reset(newThemeStore: ObservableThemeStore): void {
        this.userStore = newThemeStore.userStore;
        this.defaultThemeSettings = newThemeStore.defaultThemeSettings;
        this.systemMode = newThemeStore.systemMode;
    }
}