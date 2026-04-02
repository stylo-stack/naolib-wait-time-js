import { test } from "node:test";
import assert from "node:assert/strict";
import { ApiError } from "../../src/errors/ApiError";

test("ApiError: properties are set correctly", () => {
    const err = new ApiError(404, "https://example.com/api");
    assert.equal(err.status, 404);
    assert.equal(err.url, "https://example.com/api");
    assert.equal(err.name, "ApiError");
    assert.match(err.message, /404/);
    assert.ok(err instanceof Error);
});
