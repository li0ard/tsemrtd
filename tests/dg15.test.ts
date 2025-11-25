import { test, expect } from "bun:test";
import { join } from "path";
import { DG15 } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG15", async () => {
    const data = DG15.load(await getDGContent("EF_DG15.bin"));
    expect(data.algorithm.algorithm).toBe("1.2.840.113549.1.1.1");
    expect(data.subjectPublicKey.byteLength).toBe(139);
});