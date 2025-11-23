import { test, expect } from "bun:test";
import { join } from "path";
import { DG1 } from "../src";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG1", async () => {
    const data = DG1.load(await getDGContent("EF_DG1.bin"));
    expect(data).toBe("P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<C11T002JM4D<<9608122F1310317<<<<<<<<<<<<<<<6");
});