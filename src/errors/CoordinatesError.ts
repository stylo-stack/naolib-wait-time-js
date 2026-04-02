import { Coordinates } from "../Stops/types"



export class CoordinatesError extends Error {
    provided: Coordinates;
    constructor(provided: Coordinates) {
        const message = `Coordinates ${provided.latitude}, ${provided.longitude} are out of bounds for the Loire Atlantique area.`;

        super(message);

        this.name = "CoordinatesError";
        this.provided = provided;
    }
}