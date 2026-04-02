import { test } from "node:test";
import assert from "node:assert/strict";
import { getWaitTimeForPlace, getNextDepartures } from "../../src/WaitTime/index";

test("getWaitTimeForPlace: returns departures for COMM", async () => {
    const departures = await getWaitTimeForPlace("COMM");
    assert.ok(Array.isArray(departures));
    if (departures.length > 0) {
        const d = departures[0];
        assert.ok(typeof d.ligne.numLigne === "string");
        assert.ok(typeof d.sens === "number");
        assert.ok(typeof d.temps === "string");
    }
});

test("getWaitTimeForPlace: throws on empty codeLieu", async () => {
    await assert.rejects(() => getWaitTimeForPlace("  "), /must not be empty/);
});

test("getNextDepartures: limit option is respected", async () => {
    const all = await getNextDepartures("COMM");
    const limited = await getNextDepartures("COMM", { limit: 2 });
    assert.ok(limited.length <= 2);
    assert.ok(all.length >= limited.length);
});

test("getNextDepartures: line filter returns only matching line", async () => {
    const all = await getNextDepartures("COMM");
    if (all.length === 0) return;
    const targetLine = all[0].ligne.numLigne;
    const filtered = await getNextDepartures("COMM", { line: targetLine });
    assert.ok(filtered.every(d => d.ligne.numLigne === targetLine));
});

test("getNextDepartures: sens filter returns only matching direction", async () => {
    const filtered = await getNextDepartures("COMM", { sens: 1 });
    assert.ok(filtered.every(d => d.sens === 1));
});

test("getNextDepartures: combined filters work together", async () => {
    const all = await getNextDepartures("COMM");
    if (all.length === 0) return;
    const targetLine = all[0].ligne.numLigne;
    const result = await getNextDepartures("COMM", { line: targetLine, sens: 1, limit: 1 });
    assert.ok(result.length <= 1);
    assert.ok(result.every(d => d.ligne.numLigne === targetLine && d.sens === 1));
});
