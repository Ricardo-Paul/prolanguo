
export interface Request {
  readonly path: string;
  readonly method: 'get' | 'post';
  readonly authRequired: boolean;
  readonly query: null | object;
  readonly body: null | object;
}