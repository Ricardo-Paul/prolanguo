export interface SignInRequest {
  readonly path: '/sign-in',
  readonly method: 'post',
  readonly query: null,
  readonly authRequired: false,
  readonly body: {
    readonly email: string,
    readonly password: string
  }
}