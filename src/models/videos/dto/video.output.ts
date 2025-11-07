import {AvailableResolutions} from "../types";
import {Nullable} from "../../../core/types";
/**
 * @property canBeDownloaded By default - false
 * @property publicationDate By default - +1 day from CreatedAt
 * @property minAgeRestriction By default - null
 */
export type Video = {
    id: number
    title: number
    author: number
    canBeDownloaded: boolean
    minAgeRestriction: Nullable<number>
    createdAt: string
    publicationDate: string
    availableResolutions: AvailableResolutions[]
}