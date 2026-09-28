import { test, expect } from "bun:test";
import { DG1 } from "../src/index.js";
import { getDGContent } from "./_test_utils.test.js";

test("DG1", async () => {
    const data = DG1.load(await getDGContent("EF_DG1.bin"));
    expect(data).toBe("P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<C11T002JM4D<<9608122F1310317<<<<<<<<<<<<<<<6");
});