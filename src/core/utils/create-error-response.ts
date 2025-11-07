import {ErrorResponse, ErrorField} from "../types/error-response-type";

export const createErrorResponse = (errors: ErrorField[]): ErrorResponse => {
    return {
        errorMessages: errors,
    }
}