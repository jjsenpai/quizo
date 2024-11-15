import { ErrorResponse } from "@/lib/fetch/types";

export interface IClientErrorInfo {
    status: number;
    response: ErrorResponse;
}

export class ClientError extends Error {
    public errorInfo: IClientErrorInfo;

    constructor(status: number, response: ErrorResponse) {
        const message = response.message;
        super(message);
        this.errorInfo = {
            status,
            response,
        };
    }
}
