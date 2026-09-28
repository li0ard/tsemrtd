import { test, expect } from "bun:test";
import { DG15 } from "../src/index.js";
import { getDGContent } from "./_test_utils.test.js";

test("DG15", async () => {
    const data = DG15.load(await getDGContent("EF_DG15.bin"));
    expect(data.algorithm.algorithm).toBe("1.2.840.113549.1.1.1");
    expect(data.subjectPublicKey.byteLength).toBe(139);
});