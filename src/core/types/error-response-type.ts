export type ErrorField = {
    field: string;
    message: string;
}

export type ErrorResponse = {
    errorsMessages: ErrorField[];
}