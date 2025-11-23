import { test, expect } from "bun:test";
import { join } from "path";
import { SOD } from "../src"

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("SOD", async () => {
    const data = SOD.load(await getDGContent("EF_SOD.bin"));
    expect(data.certificates.length).toBe(1);
    expect(data.signatures.length).toBe(1);
    expect(data.ldsObject.version).toBe(0);
    expect(data.ldsObject.algorithm.algorithm).toBe("1.3.14.3.2.26");
    expect(data.ldsObject.hashes.length).toBe(4);
});