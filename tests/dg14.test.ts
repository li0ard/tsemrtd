import { test, expect } from "bun:test";
import { DG14, Schemas } from "../src/index.js";
import { getDGContent } from "./_test_utils.test.js";

test("DG14", async () => {
    const data = DG14.load(await getDGContent("EF_DG14.bin"));
    const ta = data.find(i => i instanceof Schemas.EAC.TerminalAuthenticationInfo) as Schemas.EAC.TerminalAuthenticationInfo;
    const ca = data.find(i => i instanceof Schemas.EAC.ChipAuthenticationInfo) as Schemas.EAC.ChipAuthenticationInfo;
    const caPk = data.find(i => i instanceof Schemas.EAC.ChipAuthenticationPublicKeyInfo) as Schemas.EAC.ChipAuthenticationPublicKeyInfo;
    
    expect(ta.protocol).toBe("0.4.0.127.0.7.2.2.2");
    expect(ta.version).toBe(1);
    expect(ca.protocol).toBe("0.4.0.127.0.7.2.2.3.2.1");
    expect(ca.version).toBe(1);
    expect(caPk.protocol).toBe("0.4.0.127.0.7.2.2.1.2");
    expect(caPk.chipAuthenticationPublicKey.algorithm.algorithm).toBe("1.2.840.10045.2.1");
});