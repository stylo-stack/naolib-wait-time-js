import { test } from "node:test";
import assert from "node:assert/strict";
import { CoordinatesError } from "../../src/errors/CoordinatesError";

test("CoordinatesError: properties are set correctly", () => {
    const coords = { latitude: 48.85, longitude: 2.35 };
    const err = new CoordinatesError(coords);
    assert.deepEqual(err.provided, coords);
    assert.equal(err.name, "CoordinatesError");
    assert.match(err.message, /48.85/);
    assert.ok(err instanceof Error);
});
