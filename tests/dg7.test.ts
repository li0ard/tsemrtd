import { test, expect } from "bun:test";
import { join } from "path";
import { DG7 } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG7", async () => {
    const data = DG7.load(await getDGContent("EF_DG7.bin"));
    expect(
        new Bun.CryptoHasher("sha256").update(data[0]).digest().toString("hex")
    ).toBe("a3c5801a3692cf43495e391dc70d32e41526b4a5f700d5566c64688e897482e5");
});
