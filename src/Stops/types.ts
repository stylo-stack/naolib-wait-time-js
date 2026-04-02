// Types for the official SEMITAN arrets.json endpoint
export type StopLigne = {
    numLigne: string;
}

export type ArretStop = {
    codeLieu: string;
    libelle: string;
    distance: string | null;
    ligne: StopLigne[];
}

// Types for the naolib planner search endpoint
export type Stop = {
    id: number;
    name: string;
    stop_id: string;
    external_id: string;
    lat: number;
    lng: number;
    is_accessible: boolean;
    linked_lines: string[];
    linked_stops: string[];
    instance: "stop";
};

export type POIOptionsBicloo = {
    status: string;
    address: string;
    bike_stands: number;
    available_bikes: number;
    available_bike_stands: number;
};

export type POIOptionsMarguerite = {
    cp: string;
    adresse: string;
    commune: string;
    conditions: string;
    description: string;
};

export type POIOptionsBiclooPark = {
    isfree: string;
    status: string;
    address: string;
    capacity: number;
    accesstype: string;
    lockertype: string;
    availablespots: number;
    hassurveillance: string;
    haselectricsupport: string;
};

export type POI = {
    id: number;
    type: string;
    real_type: string;
    name: string;
    lat: number;
    lng: number;
    options: POIOptionsBicloo | POIOptionsMarguerite | POIOptionsBiclooPark;
    icon_poi: string;
    instance: "poi";
};

export type Address = {
    id: number;
    name: string;
    number: string;
    suffix: string | null;
    insee: string;
    city: string;
    lat: number;
    lng: number;
    instance: "address";
};

export type StopSearchResponse = {
    stops: Stop[];
    lines: unknown[];
    poiTypes: unknown[];
    pois: POI[];
    cities: unknown[];
    addresses: Address[];
    recent: unknown[];
};

export type Coordinates = {
    longitude: number;
    latitude: number;
}
