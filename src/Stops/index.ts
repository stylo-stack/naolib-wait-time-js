import axios from "axios";
import { CoordinatesError } from "../errors/CoordinatesError";
import { ApiError } from "../errors/ApiError";
import { isInLoireAtlantique } from "./utils";
import { naolibUrl, tanBaseURL } from "../consts";
import { ArretStop, Coordinates, StopSearchResponse } from "./types";

const arretsUrl = `${tanBaseURL}/arrets.json`;
const naolibSearchUrl = `${naolibUrl}/api/global/search`;

/**
 * Returns all stops from the official SEMITAN API.
 * If coordinates are provided, only stops within ~500m are returned.
 * Throws CoordinatesError if coordinates are outside Loire-Atlantique bounds.
 */
export const getStops = async (coordinates?: Coordinates): Promise<ArretStop[]> => {
    if (coordinates && !isInLoireAtlantique(coordinates)) {
        throw new CoordinatesError(coordinates);
    }

    const url = coordinates
        ? `${arretsUrl}/${coordinates.latitude}/${coordinates.longitude}`
        : arretsUrl;

    try {
        const { data } = await axios.get<ArretStop[]>(url, {
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

/**
 * Finds a single stop by its code (e.g. "COMM") or display name (e.g. "Commerce").
 * The match is case-insensitive. Returns undefined if no stop matches.
 */
export const findStop = async (nameOrCode: string): Promise<ArretStop | undefined> => {
    if (!nameOrCode.trim()) throw new Error("nameOrCode must not be empty");

    const stops = await getStops();
    const q = nameOrCode.trim().toLowerCase();
    return stops.find(
        s => s.codeLieu.toLowerCase() === q || s.libelle.toLowerCase() === q
    );
}

/**
 * Searches stops, POIs, addresses, and lines by name via the naolib planner API.
 */
export const searchStopsByName = async (query: string): Promise<StopSearchResponse> => {
    if (!query.trim()) throw new Error("query must not be empty");

    const url = `${naolibSearchUrl}/${encodeURIComponent(query.trim())}`;
    try {
        const { data } = await axios.get<StopSearchResponse>(url, {
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
