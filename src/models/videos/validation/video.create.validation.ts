import {VideoCreateInput} from "../dto/video.input";
import {ErrorField} from "../../../core/types/error-response-type";
import {AvailableResolutions} from "../types";

const errorMessage = 'Incorrect value'
export const validateVideoCreation = (body: Partial<VideoCreateInput>): ErrorField[] => {
    const {title, author, availableResolution} = body
    const errors: ErrorField[] = [];

    if (
        !title ||
        typeof title !== "string" ||
        title?.trim().length < 1 ||
        title?.trim().length > 40
    ) {
        errors.push({field: 'title', message: errorMessage});
    }


    if (
        !author ||
        typeof author !== "string" ||
        author?.trim().length < 1 ||
        author?.trim().length > 20
    ) {
        errors.push({field: 'author', message: errorMessage});
    }


    const availableResolutionsValues = Object.values(AvailableResolutions);

    if (
        !Array.isArray(availableResolution) ||
        availableResolution.length < 1 ||
        availableResolution.length > availableResolutionsValues.length ||
        availableResolution.some(r => !availableResolutionsValues.includes(r))
    ) {
        errors.push({field: 'availableResolution', message: errorMessage});
    }


    return errors;
}