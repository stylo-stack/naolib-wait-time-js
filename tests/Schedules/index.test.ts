import { test } from "node:test";
import assert from "node:assert/strict";
import { getSchedule } from "../../src/Schedules/index";
import { getWaitTimeForPlace } from "../../src/WaitTime/index";

test("getSchedule: returns schedule for a known stop/line/direction", async () => {
    const departures = await getWaitTimeForPlace("COMM");
    assert.ok(departures.length > 0, "Need at least one departure at COMM to test getSchedule");

    const { arret, ligne, sens } = departures[0];
    const schedule = await getSchedule(arret.codeArret, ligne.numLigne, sens as 1 | 2);
    assert.ok(schedule !== null && typeof schedule === "object");
});

test("getSchedule: throws on empty codeArret", async () => {
    await assert.rejects(() => getSchedule("  ", "2", 1), /must not be empty/);
});

test("getSchedule: throws on empty numLigne", async () => {
    await assert.rejects(() => getSchedule("ABCD", "  ", 1), /must not be empty/);
});
