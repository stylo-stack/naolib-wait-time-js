import axios from "axios";
import { tanBaseURL } from "../consts";
import { ApiError } from "../errors/ApiError";
import { Schedule } from "./types";

const horairesUrl = `${tanBaseURL}/horairesarret.json`;

/**
 * Returns the full schedule for a specific stop, line, and direction.
 *
 * @param codeArret - Stop code from getWaitTimeForPlace (departure.arret.codeArret)
 * @param numLigne  - Line number from getWaitTimeForPlace (departure.ligne.numLigne)
 * @param sens      - Direction: 1 = towards terminus 1, 2 = towards terminus 2
 */
export const getSchedule = async (
    codeArret: string,
    numLigne: string,
    sens: 1 | 2
): Promise<Schedule> => {
    if (!codeArret.trim()) throw new Error("codeArret must not be empty");
    if (!numLigne.trim()) throw new Error("numLigne must not be empty");

    const url = `${horairesUrl}/${codeArret.trim()}/${numLigne.trim()}/${sens}`;
    try {
        const { data } = await axios.get<Schedule>(url, {
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
