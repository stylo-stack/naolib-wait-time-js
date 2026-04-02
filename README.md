# naolib

A TypeScript library for the [SEMITAN](https://www.tan.fr) public transport API (Nantes, France).

Covers three official endpoints:
- **Stop list** — all stops, optionally filtered by proximity
- **Wait times** — real-time next departures at a stop zone
- **Schedules** — full timetable for a specific stop/line/direction

And one unofficial endpoint:
- **Name search** — search stops, addresses, and POIs via the naolib planner

---

## Installation

```bash
npm install
npm run build
```

## Environment

By default the library targets the **preprod** environment. Set `ENVIRONMENT=prod` to use production:

```bash
ENVIRONMENT=prod node dist/index.js
```

| Environment | Base URL |
|-------------|----------|
| preprod (default) | `https://openv2-preprod.tan.fr/ewp` |
| prod | `https://open.tan.fr/ewp` |

---

## API

### `getStops(coordinates?)`

Returns all stops from the SEMITAN network. If `coordinates` are provided, only stops within ~500 m are returned.

Throws `CoordinatesError` if coordinates are outside Loire-Atlantique bounds.

```ts
import { getStops } from "naolib";

// All stops
const stops = await getStops();

// Nearby stops
const nearby = await getStops({ latitude: 47.218, longitude: -1.553 });

// Each stop
stops[0].codeLieu;  // e.g. "COMM" — used as input to getWaitTimeForPlace
stops[0].libelle;   // e.g. "Commerce"
stops[0].distance;  // e.g. "+- 500m" or null
stops[0].ligne;     // [{ numLigne: "2" }, ...]
```

**Endpoint:** `GET /arrets.json[/{latitude}/{longitude}]`

---

### `getWaitTimeForPlace(codeLieu)`

Returns real-time next departures for all lines serving a stop zone.

```ts
import { getWaitTimeForPlace, LineType } from "naolib";

const departures = await getWaitTimeForPlace("COMM");

departures[0].terminus;          // "Orvault Grandval"
departures[0].temps;             // "3 mn"
departures[0].sens;              // 1 or 2
departures[0].infotrafic;        // true if traffic alert active
departures[0].dernierDepart;     // true if this is the last departure
departures[0].tempsReel;         // true if time is real-time (vs scheduled)
departures[0].ligne.numLigne;    // "2"
departures[0].ligne.typeLigne;   // LineType.TRAMWAY
departures[0].arret.codeArret;   // "recteurschmidt" — used as input to getSchedule
```

**Endpoint:** `GET /tempsattente.json/{codeLieu}`

---

### `getSchedule(codeArret, numLigne, sens)`

Returns the full timetable for a specific stop, line, and direction.

- `codeArret` — from `departure.arret.codeArret`
- `numLigne` — from `departure.ligne.numLigne`
- `sens` — `1` (towards terminus 1) or `2` (towards terminus 2)

```ts
import { getSchedule } from "naolib";

const schedule = await getSchedule("PIRA1", "27", 1);

schedule.arret.libelle;          // "Pirmil"
schedule.arret.est_accessible;  // true

schedule.ligne.directionSens1;  // "La Herdrie"
schedule.ligne.directionSens2;  // "Pirmil"
schedule.ligne.libelleTrafic;   // "Service normal"

schedule.prochainsParcours;     // [{ terminus: "La Herdrie", temps: "30 mn" }, ...]
schedule.horaires;               // [{ heure: "6h", passages: ["47"] }, ...]
schedule.prochainsHoraires;     // [{ heure: "12h", passages: "06" }, ...]

schedule.codeCouleur;           // "1" (BLEU), "2" (VERT), etc.
schedule.plageDeService;        // Human-readable service range description
schedule.notes;                  // [{ code: "a", libelle: "Ne circule pas le ..." }]
```

**Endpoint:** `GET /horairesarret.json/{codeArret}/{numLigne}/{sens}`

---

### `searchStopsByName(query)` *(unofficial)*

Searches for stops, lines, POIs, and addresses by name using the naolib planner API.

```ts
import { searchStopsByName } from "naolib";

const results = await searchStopsByName("Commerce");

results.stops;      // Stop[]
results.addresses;  // Address[]
results.pois;       // POI[]
```

**Endpoint:** `GET https://plan.naolib.fr/api/global/search/{query}`

---

## Types

### `LineType` enum

| Value | Number |
|-------|--------|
| `TRAMWAY` | 1 |
| `BUSWAY`  | 2 |
| `BUS`     | 3 |
| `NAVIBUS` | 4 |

### `codeCouleur` values

| Value | Colour |
|-------|--------|
| `"1"` | Bleu   |
| `"2"` | Vert   |
| `"3"` | Jaune  |
| `"4"` | Violet |
| `"5"` | Blanc  |
| `"6"` | Orange |

### `sens` values

| Value | Meaning |
|-------|---------|
| `1` | Towards terminus 1 |
| `2` | Towards terminus 2 |

---

## Typical usage flow

```ts
// 1. Get all stops (or nearby stops)
const stops = await getStops();
const stop = stops.find(s => s.libelle === "Commerce"); // { codeLieu: "COMM", ... }

// 2. Get real-time departures at that stop
const departures = await getWaitTimeForPlace(stop.codeLieu);
const next = departures[0];
// next.arret.codeArret => "recteurschmidt"
// next.ligne.numLigne  => "2"
// next.sens            => 1

// 3. Get the full timetable
const schedule = await getSchedule(next.arret.codeArret, next.ligne.numLigne, next.sens);
```

---

## Error handling

### `CoordinatesError`

Thrown by `getStops()` when coordinates are outside Loire-Atlantique bounds (lat 47.0–47.5, lon -2.4–-1.5).

```ts
import { CoordinatesError } from "naolib";

try {
    await getStops({ latitude: 48.8, longitude: 2.3 }); // Paris
} catch (e) {
    if (e instanceof CoordinatesError) {
        console.error(e.message);   // "Coordinates 48.8, 2.3 are out of bounds..."
        console.error(e.provided);  // { latitude: 48.8, longitude: 2.3 }
    }
}
```
