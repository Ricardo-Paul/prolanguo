import { ObservableThemeStore, ObservableUserStore } from "..";
import { ObservableStore } from "./ObservableStore";
import * as _ from "lodash";
import { action } from "mobx";

export class ObservableRootStore extends ObservableStore {
    public userStore: ObservableUserStore;
    public themeStore: ObservableThemeStore;

    // NOTE: we're converting to unknown first to avoid compiler complaints
    @action
    public reset(newRootStore: ObservableRootStore): void {
        _.forOwn(
            this,
            (_, childStoreName): void => {
                const newChildStore = newRootStore[childStoreName as keyof ObservableRootStore];
                if(newChildStore instanceof ObservableStore){
                    (this[childStoreName as keyof ObservableRootStore] as unknown as ObservableStore)
                    .reset(newChildStore)
                }
            }
        )
    };

    constructor(
        userStore: ObservableUserStore,
        themeStore: ObservableThemeStore
    ){
        super();
        this.userStore = userStore;
        this.themeStore = themeStore
    }
}