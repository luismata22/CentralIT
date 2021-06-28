import { BaseError } from "./baseerror";


export interface NotFoundError extends BaseError {
    Code: number;
    ErrorMsg: string;

}
