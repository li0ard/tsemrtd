import { test, expect } from "bun:test";
import { join } from "path";
import { DG12 } from "../src";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG12", async () => {
    const data = DG12.load(await getDGContent("EF_DG12.bin"));
    expect(data.dateOfIssue).toBe(20240101);
    expect(data.issuingAuthority).toBe("TEST");
    expect(data.namesOfOtherPersons[0]).toBe("William");
    expect(data.endorsements).toBe("TEST");
    expect(data.taxAndExitReqs).toBe("TEST");
    expect(data.dateOfPersonalization).toBe(20240101123059);
    expect(data.personalizationNumber).toBe("123");
});