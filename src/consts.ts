const preprod = "https://openv2-preprod.tan.fr/ewp";
const prod = "https://open.tan.fr/ewp";

export const tanBaseURL = process.env.ENVIRONMENT === "prod" ? prod : preprod;

export const naolibUrl = "https://plan.naolib.fr";