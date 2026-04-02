import axios from "axios";
import { tanBaseURL } from "../consts";
import { ApiError } from "../errors/ApiError";
import { WaitTime } from "./types";

const waitTimeUrl = `${tanBaseURL}/tempsattente.json`;

/**
 * Returns real-time next departures for all lines serving a stop zone.
 *
 * @param codeLieu - Stop zone code from getStops() (e.g. "COMM")
 */
export const getWaitTimeForPlace = async (codeLieu: string): Promise<WaitTime[]> => {
    if (!codeLieu.trim()) throw new Error("codeLieu must not be empty");

    const url = `${waitTimeUrl}/${codeLieu.trim()}`;
    try {
        const { data } = await axios.get<WaitTime[]>(url, {
            headers: { "Accept-Language": "fr_FR" },
        });
        return data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            throw new ApiError(e.response.status, url);
        }
        throw e;
    }
}

export type GetNextDeparturesOptions = {
    /** Filter to a specific line number (e.g. "2") */
    line?: string;
    /** Filter to a specific direction: 1 = terminus 1, 2 = terminus 2 */
    sens?: 1 | 2;
    /** Maximum number of results to return */
    limit?: number;
}

/**
 * Like getWaitTimeForPlace but with optional filtering by line, direction, and count.
 *
 * @param codeLieu - Stop zone code from getStops() (e.g. "COMM")
 * @param options  - Optional filters
 */
export const getNextDepartures = async (
    codeLieu: string,
    options?: GetNextDeparturesOptions
): Promise<WaitTime[]> => {
    let results = await getWaitTimeForPlace(codeLieu);

    if (options?.line) {
        results = results.filter(d => d.ligne.numLigne === options.line);
    }
    if (options?.sens !== undefined) {
        results = results.filter(d => d.sens === options.sens);
    }
    if (options?.limit !== undefined) {
        results = results.slice(0, options.limit);
    }

    return results;
}
