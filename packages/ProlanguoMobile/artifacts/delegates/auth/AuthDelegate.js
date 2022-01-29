"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDelegate = void 0;
const prolanguo_action_1 = require("@prolanguo/prolanguo-action");
const prolanguo_event_1 = require("@prolanguo/prolanguo-event");
class AuthDelegate {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    ;
    signInAsGuest(callbacks) {
        // register callbacks to events AuthSaga will emit
        // publish message so AuthSaga start signing user in
        this.eventBus.pubsub((0, prolanguo_action_1.createAction)(prolanguo_action_1.ActionType.USER__SIGN_IN_USER_AS_GUEST, null), (0, prolanguo_event_1.group)((0, prolanguo_event_1.on)(prolanguo_action_1.ActionType.USER__SIGNING_IN_USER_AS_GUEST, callbacks.signinInAsGuest), (0, prolanguo_event_1.once)(prolanguo_action_1.ActionType.USER__SIGN_IN_SUCCEEDED_AS_GUEST, callbacks.onSignInAsGuestSucceeded), (0, prolanguo_event_1.once)(prolanguo_action_1.ActionType.USER__SIGIN_IN_FAILED_AS_GUEST, callbacks.onSignInAsGuestFailed)));
    }
}
exports.AuthDelegate = AuthDelegate;
;
