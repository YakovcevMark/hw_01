import {AvailableResolutions} from "../types";
/**
 * @property {string} title - maxLength: 40.
 * @property {string} author - maxLength: 20.
 * @property {number} availableResolutions - At least one resolution should be added.
 */

export type VideoCreateInput = {
    /**
     * maxLength: 40
     */
    title: string,
    /**
     * maxLength: 20
     */
    author: string,
    /**
     * At least one resolution should be added
     */
    availableResolutions: AvailableResolutions[]
}
/**
 * @property {string} minAgeRestriction - max: 18, min: 1.
 */
export type VideoUpdateInput = VideoCreateInput & {
    canBeDownloaded: boolean
    minAgeRestriction: number
}