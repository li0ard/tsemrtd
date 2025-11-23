import { test, expect } from "bun:test";
import { join } from "path";
import { COM, Utils } from "../src";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("COM", async () => {
    const data = COM.load(await getDGContent("EF_COM.bin"));
    expect(data.ldsVersion).toBe("0107");
    expect(data.unicodeVersion).toBe("040000");
    expect(Utils.bytesToHex(data.tags)).toBe("6175636e");
});
