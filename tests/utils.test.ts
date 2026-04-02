import { test } from "node:test";
import assert from "node:assert/strict";
import { parseWaitMinutes } from "../src/utils";

test("parseWaitMinutes: 'Proche' returns 0", () => {
    assert.equal(parseWaitMinutes("Proche"), 0);
});

test("parseWaitMinutes: 'A l\\'arret' returns 0", () => {
    assert.equal(parseWaitMinutes("A l'arret"), 0);
});

test("parseWaitMinutes: case-insensitive match", () => {
    assert.equal(parseWaitMinutes("PROCHE"), 0);
});

test("parseWaitMinutes: '3 mn' returns 3", () => {
    assert.equal(parseWaitMinutes("3 mn"), 3);
});

test("parseWaitMinutes: '30 mn' returns 30", () => {
    assert.equal(parseWaitMinutes("30 mn"), 30);
});

test("parseWaitMinutes: '3\\'' (apostrophe format) returns 3", () => {
    assert.equal(parseWaitMinutes("3' "), 3);
});

test("parseWaitMinutes: '1h02' returns 62", () => {
    assert.equal(parseWaitMinutes("1h02"), 62);
});

test("parseWaitMinutes: '2h' returns 120", () => {
    assert.equal(parseWaitMinutes("2h"), 120);
});

test("parseWaitMinutes: unknown string returns null", () => {
    assert.equal(parseWaitMinutes("unknown"), null);
});

test("parseWaitMinutes: leading/trailing whitespace is trimmed", () => {
    assert.equal(parseWaitMinutes("  5 mn  "), 5);
});
