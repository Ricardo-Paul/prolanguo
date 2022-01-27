import { ActionType, createAction } from "@prolanguo/prolanguo-action";
import { EventBus, group, on, once } from "@prolanguo/prolanguo-event";


export class AuthDelegate {
  private eventBus: EventBus

  constructor(
    eventBus: EventBus
  ) {
    this.eventBus = eventBus
  };

  public signInAsGuest(callbacks: {
    signinInAsGuest: () => void,
    onSignInAsGuestSucceeded: (userPayload: any) => void,
    onSignInAsGuestFailed: () => void
  }) {
    // register callbacks to events AuthSaga will emit
    // publish message so AuthSaga start signing user in
    this.eventBus.pubsub(
      createAction(ActionType.USER__SIGN_IN_USER_AS_GUEST, null),
      group(
        on(ActionType.USER__SIGNING_IN_USER_AS_GUEST, callbacks.signinInAsGuest),
        once(ActionType.USER__SIGN_IN_SUCCEEDED_AS_GUEST, callbacks.onSignInAsGuestSucceeded),
        once(ActionType.USER__SIGIN_IN_FAILED_AS_GUEST, callbacks.onSignInAsGuestFailed)
      )
    )
  }
};

