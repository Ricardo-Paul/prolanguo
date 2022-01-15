import { ObservableThemeStore } from "@prolanguo/prolanguo-observable";
import { Reducer } from "./reducer";
import { Action, InferableAction, ActionType } from "@prolanguo/prolanguo-action";
import { Theme } from "@prolanguo/prolanguo-common/enums";

export class ThemeStoreReducer extends Reducer{
    private themeStore: ObservableThemeStore;

    public constructor(themeStore: ObservableThemeStore){
        super();
        this.themeStore = themeStore;
    }

    // change system mode observable based an action type
    // build the action package
    public perform(action: InferableAction): void {
        if (action.is(ActionType.THEME__SYSTEM_MODE_CHANGED)) {
          this.systemModeChanged(action);
        }
      }

    // BUG: payload doesn't seem to be properly inferred
    // bypassing it for now
    // Bypassing the BUG now by setting a theme directly
    
    private systemModeChanged(
        action: Action<ActionType.THEME__SYSTEM_MODE_CHANGED>
        ): void {
            this.themeStore.systemMode = Theme.DARK; 
        }
}