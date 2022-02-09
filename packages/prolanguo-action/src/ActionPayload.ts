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

    readonly USER__SIGN_IN_USER_AS_GUEST: null,
    readonly USER__SIGNING_IN_USER_AS_GUEST: null,
    readonly USER__SIGN_IN_SUCCEEDED_AS_GUEST: {}, // replace by user payload
    readonly USER__SIGIN_IN_FAILED_AS_GUEST: ErroBag

    readonly THEME__SYSTEM_MODE_CHANGED: { systemMode: Theme }
}