export class ApiError extends Error {
    readonly status: number;
    readonly url: string;

    constructor(status: number, url: string) {
        super(`TAN API error ${status} on ${url}`);
        this.name = "ApiError";
        this.status = status;
        this.url = url;
    }
}
