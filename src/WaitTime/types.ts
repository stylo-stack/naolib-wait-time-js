export enum LineType {
    TRAMWAY = 1,
    BUSWAY = 2,
    BUS = 3,
    NAVIBUS = 4,
}

export type WaitTimeStop = {
    codeArret: string;
}

export type WaitTimeLine = {
    numLigne: string;
    typeLigne: LineType;
}

export type WaitTime = {
    sens: 1 | 2;
    terminus: string;
    infotrafic: boolean;
    temps: string;
    dernierDepart: boolean;
    tempsReel: boolean;
    ligne: WaitTimeLine;
    arret: WaitTimeStop;
}
