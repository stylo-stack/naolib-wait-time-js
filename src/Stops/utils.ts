import { Coordinates } from "./types";

export const isInLoireAtlantique = ({ latitude, longitude }: Coordinates) => {
    // Define bounds for Loire Atlantique (approximate values)
    const latMin = 47.0;
    const latMax = 47.5;
    const lonMin = -2.4;
    const lonMax = -1.5;

    return (
        latitude >= latMin &&
        latitude <= latMax &&
        longitude >= lonMin &&
        longitude <= lonMax
    );
}