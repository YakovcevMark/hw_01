import {VideoUpdateInput} from "../dto/video.input";
import {ErrorField} from "../../../core/types/error-response-type";
import {validateVideoCreation} from "./video.create.validation";
import {isValidDateString} from "../../../core/utils/is-valid-date-string";

const errorMessage = 'Incorrect value'

export const validateVideoUpdating = (body: Partial<VideoUpdateInput>): ErrorField[] => {
    const {title, author, availableResolutions, minAgeRestriction, canBeDownloaded, publicationDate} = body
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

    if (
        typeof publicationDate !== 'string' ||
        !(isValidDateString(publicationDate))
    ) {
        errors.push({field: 'publicationDate', message: errorMessage});
    }


    return errors;
}