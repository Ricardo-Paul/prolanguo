import { Request } from "./Request";
export interface SignUpRequest extends Request {
    readonly path: '/sign-up';
    readonly method: 'post';
    readonly authRequired: false;
    readonly query: null;
    readonly body: {
        readonly email: string;
        readonly password: string;
    };
}
