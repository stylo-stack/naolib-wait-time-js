export type ScheduleArret = {
    codeArret: string;
    libelle: string;
    est_accessible: boolean;
}

export type ProchainParcours = {
    terminus: string;
    temps: string;
}

export type ScheduleLigne = {
    numLigne: string;
    directionSens1: string;
    directionSens2: string;
    accessible: boolean;
    etatTrafic: string;
    libelleTrafic: string;
}

export type Note = {
    code: string;
    libelle: string;
}

export type Horaire = {
    heure: string;
    passages: string[];
}

export type ProchainsHoraire = {
    heure: string;
    passages: string;
}

export type Schedule = {
    arret: ScheduleArret;
    prochainsParcours: ProchainParcours[];
    ligne: ScheduleLigne;
    codeCouleur: string;
    plageDeService: string;
    notes: Note[];
    prochainsHoraires: ProchainsHoraire[];
    horaires: Horaire[];
}
