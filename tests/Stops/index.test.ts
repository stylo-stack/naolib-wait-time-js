import { test } from "node:test";
import assert from "node:assert/strict";
import { getStops, findStop, searchStopsByName } from "../../src/Stops/index";
import { CoordinatesError } from "../../src/errors/CoordinatesError";

test("getStops: returns an array of stops", async () => {
    const stops = await getStops();
    assert.ok(Array.isArray(stops));
    assert.ok(stops.length > 0);
    const first = stops[0];
    assert.ok(typeof first.codeLieu === "string");
    assert.ok(typeof first.libelle === "string");
    assert.ok(Array.isArray(first.ligne));
});

test("getStops: with valid Nantes coordinates returns nearby stops", async () => {
    const stops = await getStops({ latitude: 47.218, longitude: -1.553 });
    assert.ok(Array.isArray(stops));
    assert.ok(stops.length > 0);
});

test("getStops: throws CoordinatesError for out-of-bounds coordinates", async () => {
    await assert.rejects(
        () => getStops({ latitude: 48.85, longitude: 2.35 }),
        (err: unknown) => err instanceof CoordinatesError
    );
});

test("findStop: finds stop by code (case-insensitive)", async () => {
    const stop = await findStop("comm");
    assert.ok(stop !== undefined);
    assert.equal(stop!.codeLieu.toLowerCase(), "comm");
});

test("findStop: finds stop by display name", async () => {
    const stop = await findStop("Commerce");
    assert.ok(stop !== undefined);
});

test("findStop: returns undefined for unknown stop", async () => {
    const stop = await findStop("XXXXXXUNKNOWN");
    assert.equal(stop, undefined);
});

test("findStop: throws on empty string", async () => {
    await assert.rejects(() => findStop("   "), /must not be empty/);
});

test("searchStopsByName: returns structured response", async () => {
    const result = await searchStopsByName("Commerce");
    assert.ok(Array.isArray(result.stops));
    assert.ok(Array.isArray(result.lines));
    assert.ok(Array.isArray(result.addresses));
});

test("searchStopsByName: throws on empty query", async () => {
    await assert.rejects(() => searchStopsByName("  "), /must not be empty/);
});
