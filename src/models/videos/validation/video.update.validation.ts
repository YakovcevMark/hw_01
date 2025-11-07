import {VideoUpdateInput} from "../dto/video.input";
import {ErrorField} from "../../../core/types/error-response-type";
import {validateVideoCreation} from "./video.create.validation";

const errorMessage = 'Incorrect value'

export const validateVideoUpdating = (body: Partial<VideoUpdateInput>): ErrorField[] => {
    const {title, author, availableResolutions, minAgeRestriction, canBeDownloaded} = body
    const errors: ErrorField[] = validateVideoCreation({title, author, availableResolutions});

    if (
        minAgeRestriction && (
            minAgeRestriction > 18 ||
            minAgeRestriction < 1
        )
    ) {
        errors.push({field: 'minAgeRestriction', message: errorMessage});
    }


    if (
        typeof canBeDownloaded !== 'boolean'
    ) {
        errors.push({field: 'canBeDownloaded', message: errorMessage});
    }


    return errors;
}