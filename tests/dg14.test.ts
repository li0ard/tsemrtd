import { test, expect } from "bun:test";
import { join } from "path";
import { DG14, Schemas } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG14", async () => {
    const data = DG14.load(await getDGContent("EF_DG14.bin"));
    const ta = data.filter(i => i instanceof Schemas.EAC.TerminalAuthenticationInfo)[0] as Schemas.EAC.TerminalAuthenticationInfo;
    const ca = data.filter(i => i instanceof Schemas.EAC.ChipAuthenticationInfo)[0] as Schemas.EAC.ChipAuthenticationInfo;
    const caPk = data.filter(i => i instanceof Schemas.EAC.ChipAuthenticationPublicKeyInfo)[0] as Schemas.EAC.ChipAuthenticationPublicKeyInfo;
    
    expect(ta.protocol).toBe("0.4.0.127.0.7.2.2.2");
    expect(ta.version).toBe(1);
    expect(ca.protocol).toBe("0.4.0.127.0.7.2.2.3.2.1");
    expect(ca.version).toBe(1);
    expect(caPk.protocol).toBe("0.4.0.127.0.7.2.2.1.2");
    expect(caPk.chipAuthenticationPublicKey.algorithm.algorithm).toBe("1.2.840.10045.2.1");
});