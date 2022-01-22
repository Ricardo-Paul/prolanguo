import { Theme } from "@prolanguo/prolanguo-common/enums";
import { DeepPartial } from "@prolanguo/prolanguo-common/extended-types";
import { ErroBag } from "@prolanguo/prolanguo-common/interfaces";

// payload for each type of action
export interface ActionPayload {
    [P: string]: null | object;

    readonly APP__ININTIALIZE: null;
    readonly APP__INITIALIZING: null;
    readonly APP__INITIALIZE_SUCCEEDED: null;
    readonly APP__INITIALIZE_FAILED: ErroBag;
    readonly APP__APP_ALREADY_INITIALED: null;

    readonly THEME__SYSTEM_MODE_CHANGED: { systemMode: Theme }
}