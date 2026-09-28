import { test, expect } from "bun:test";
import { COM } from "../src/index.js";
import { getDGContent } from "./_test_utils.test.js";
import { bytesToHex } from "@noble/hashes/utils.js";

test("COM", async () => {
    const data = COM.load(await getDGContent("EF_COM.bin"));
    expect(data.ldsVersion).toBe("0107");
    expect(data.unicodeVersion).toBe("040000");
    expect(bytesToHex(data.tags)).toBe("6175636e");
});
