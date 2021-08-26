import { Request } from "./Request";
export interface SignUpRequest extends Request {
    readonly path: '/sign-up';
    readonly method: 'post';
}
