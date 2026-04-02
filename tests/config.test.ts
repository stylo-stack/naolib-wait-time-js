import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { configure } from "../src/config";
import { getBaseURL } from "../src/config";

afterEach(() => {
    // Reset to default after each test
    configure({ env: "prod" });
});

test("getBaseURL: defaults to prod", () => {
    configure({ env: "prod" });
    assert.equal(getBaseURL(), "https://open.tan.fr/ewp");
});

test("configure: switches to preprod", () => {
    configure({ env: "preprod" });
    assert.equal(getBaseURL(), "https://openv2-preprod.tan.fr/ewp");
});

test("configure: switches back to prod", () => {
    configure({ env: "preprod" });
    configure({ env: "prod" });
    assert.equal(getBaseURL(), "https://open.tan.fr/ewp");
});
