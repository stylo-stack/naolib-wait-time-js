import { test } from "node:test";
import assert from "node:assert/strict";
import { isInLoireAtlantique } from "../../src/Stops/utils";

test("isInLoireAtlantique: Nantes centre is inside bounds", () => {
    assert.equal(isInLoireAtlantique({ latitude: 47.218, longitude: -1.553 }), true);
});

test("isInLoireAtlantique: Paris is outside bounds", () => {
    assert.equal(isInLoireAtlantique({ latitude: 48.85, longitude: 2.35 }), false);
});

test("isInLoireAtlantique: exact boundary values are included", () => {
    assert.equal(isInLoireAtlantique({ latitude: 47.0, longitude: -2.4 }), true);
    assert.equal(isInLoireAtlantique({ latitude: 47.5, longitude: -1.5 }), true);
});

test("isInLoireAtlantique: just outside latitude boundary", () => {
    assert.equal(isInLoireAtlantique({ latitude: 46.99, longitude: -1.55 }), false);
    assert.equal(isInLoireAtlantique({ latitude: 47.51, longitude: -1.55 }), false);
});
