import { test, expect } from "bun:test";
import { join } from "path";
import { DG11 } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG11", async () => {
    const data = DG11.load(await getDGContent("EF_DG11.bin"));
    expect(data.nameOfHolder).toBe("Doe John");
    expect(data.otherNames[0]).toBe("William");
    expect(data.personalNumber).toBe("123");
    expect(data.fullDateOfBirth).toBe(19700101);
    expect(data.placeOfBirth[0]).toBe("TEST");
    expect(data.placeOfBirth[1]).toBe("TEST");
    expect(data.permanentAddress[0]).toBe("TEST");
    expect(data.permanentAddress[1]).toBe("TEST");
    expect(data.telephone).toBe("123");
    expect(data.profession).toBe("TEST");
    expect(data.title).toBe("TEST");
    expect(data.personalSummary).toBe("TEST");
    expect(data.otherValidTDNumbers[0]).toBe("123");
    expect(data.otherValidTDNumbers[1]).toBe("123");
    expect(data.custodyInformation).toBe("TEST");
});