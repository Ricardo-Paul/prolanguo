export enum ActionType {
    THEME__SYSTEM_MODE_CHANGED = 'THEME__SYSTEM_MODE_CHANGED',
    APP__INITIALIZE = "APP__INITIALIZE",
    APP__INITIALIZING = "APP__INITIALIZING",
    APP__INITIALIZE_SUCCEEDED = "APP__INITIALIZE_SUCCEEDED",
    APP__ALREADY_INITIALIZED = "APP__ALREADY_INITIALIZED",
    APP__INITIALIZE_FAILED = "APP__INITIALIZE_FAILED",

    USER__SIGN_IN_USER_AS_GUEST = "USER__SIGN_IN_USER_AS_GUEST",
    USER__SIGNING_IN_USER_AS_GUEST = "USER__SIGIN_IN_USER_AS_GUEST",
    USER__SIGN_IN_SUCCEEDED_AS_GUEST = "USER__SIGN_IN_SUCCEEDED_AS_GUEST",
    USER__SIGIN_IN_FAILED_AS_GUEST = "USER__SIGIN_IN_FAILED_AS_GUEST"
}