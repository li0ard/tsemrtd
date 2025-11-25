import { test, expect } from "bun:test";
import { join } from "path";
import { DG5 } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG5", async () => {
    const data = DG5.load(await getDGContent("EF_DG5.bin"));
    expect(
        new Bun.CryptoHasher("sha256").update(data[0]).digest().toString("hex")
    ).toBe("45f7dcc68564616fef418cf5721ce5851c27af56fc8b762b19762b06275a1a2d");
});