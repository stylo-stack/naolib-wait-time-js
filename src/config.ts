export type Environment = "prod" | "preprod";

const config = {
    env: "prod" as Environment,
};

/**
 * Configure the library.
 *
 * @param options.env - `"prod"` (default) or `"preprod"` for the SEMITAN preprod environment
 *
 * @example
 * import { configure } from "naolib-wait-time-js";
 * configure({ env: "preprod" });
 */
export const configure = (options: { env: Environment }): void => {
    config.env = options.env;
};

const urls: Record<Environment, string> = {
    prod: "https://open.tan.fr/ewp",
    preprod: "https://openv2-preprod.tan.fr/ewp",
};

export const getBaseURL = (): string => urls[config.env];
