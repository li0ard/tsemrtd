import { test, expect } from "bun:test"
import { join } from "path"
import { COM, DG1, DG2, DG3, DG5, DG7, DG11, DG12, SOD, DG15, DG4, DG14, Schemas } from "../src"

const getDGContent = async (name: string): Promise<Buffer> => {
    return Buffer.from(await Bun.file(join(import.meta.dir, "dgs", name)).bytes())
}

test("COM", async () => {
    let data = COM.load(await getDGContent("EF_COM.bin"))
    expect(data.ldsVersion).toBe("0107")
    expect(data.unicodeVersion).toBe("040000")
    expect(data.tags.toString("hex")).toBe("6175636e")
})

test("DG1", async () => {
    let data = DG1.load(await getDGContent("EF_DG1.bin"))
    expect(data).toBe("P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<C11T002JM4D<<9608122F1310317<<<<<<<<<<<<<<<6")
})

test("DG2", async () => {
    let data = DG2.load(await getDGContent("EF_DG2.bin"))
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("45f7dcc68564616fef418cf5721ce5851c27af56fc8b762b19762b06275a1a2d")
})

test("DG4", async () => {
    let data = DG4.load(await getDGContent("EF_DG4.bin"))
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("26ea8a8b009d066558326fd3db137aca345af6acaf574caf034fc0a4f89a5bef")
    expect(
        new Bun.CryptoHasher("sha256").update(data[1].imageData).digest().toString("hex")
    ).toBe("84964fe5829a960b1546f4f2a20afc65c05c1163b7ef8094ad0027b7c8541516")
})

test("DG5", async () => {
    let data = DG5.load(await getDGContent("EF_DG5.bin"))
    expect(
        new Bun.CryptoHasher("sha256").update(data[0]).digest().toString("hex")
    ).toBe("45f7dcc68564616fef418cf5721ce5851c27af56fc8b762b19762b06275a1a2d")
})

test("DG7", async () => {
    let data = DG7.load(await getDGContent("EF_DG7.bin"))
    expect(
        new Bun.CryptoHasher("sha256").update(data[0]).digest().toString("hex")
    ).toBe("a3c5801a3692cf43495e391dc70d32e41526b4a5f700d5566c64688e897482e5")
})

test("DG11", async () => {
    let data = DG11.load(await getDGContent("EF_DG11.bin"))
    expect(data.nameOfHolder).toBe("Doe John")
    expect(data.otherNames[0]).toBe("William")
    expect(data.personalNumber).toBe("123")
    expect(data.fullDateOfBirth).toBe(19700101)
    expect(data.placeOfBirth[0]).toBe("TEST")
    expect(data.placeOfBirth[1]).toBe("TEST")
    expect(data.permanentAddress[0]).toBe("TEST")
    expect(data.permanentAddress[1]).toBe("TEST")
    expect(data.telephone).toBe("123")
    expect(data.profession).toBe("TEST")
    expect(data.title).toBe("TEST")
    expect(data.personalSummary).toBe("TEST")
    expect(data.otherValidTDNumbers[0]).toBe("123")
    expect(data.otherValidTDNumbers[1]).toBe("123")
    expect(data.custodyInformation).toBe("TEST")
})

test("DG12", async () => {
    let data = DG12.load(await getDGContent("EF_DG12.bin"))
    expect(data.dateOfIssue).toBe(20240101)
    expect(data.issuingAuthority).toBe("TEST")
    expect(data.namesOfOtherPersons[0]).toBe("William")
    expect(data.endorsements).toBe("TEST")
    expect(data.taxAndExitReqs).toBe("TEST")
    expect(data.dateOfPersonalization).toBe(20240101123059)
    expect(data.personalizationNumber).toBe("123")
})

test("DG14", async () => {
    let data = DG14.load(await getDGContent("EF_DG14.bin"))
    let ta = data.filter(i => i instanceof Schemas.EAC.TerminalAuthenticationInfo)[0] as Schemas.EAC.TerminalAuthenticationInfo
    let ca = data.filter(i => i instanceof Schemas.EAC.ChipAuthenticationInfo)[0] as Schemas.EAC.ChipAuthenticationInfo
    let caPk = data.filter(i => i instanceof Schemas.EAC.ChipAuthenticationPublicKeyInfo)[0] as Schemas.EAC.ChipAuthenticationPublicKeyInfo
    
    expect(ta.protocol).toBe("0.4.0.127.0.7.2.2.2")
    expect(ta.version).toBe(1)
    expect(ca.protocol).toBe("0.4.0.127.0.7.2.2.3.2.1")
    expect(ca.version).toBe(1)
    expect(caPk.protocol).toBe("0.4.0.127.0.7.2.2.1.2")
    expect(caPk.chipAuthenticationPublicKey.algorithm.algorithm).toBe("1.2.840.10045.2.1")
})

test("DG15", async () => {
    let data = DG15.load(await getDGContent("EF_DG15.bin"))
    expect(data.algorithm.algorithm).toBe("1.2.840.113549.1.1.1")
    expect(data.subjectPublicKey.byteLength).toBe(139)
})

test("SOD", async () => {
    let data = SOD.load(await getDGContent("EF_SOD.bin"))
    expect(data.certificates.length).toBe(1)
    expect(data.signatures.length).toBe(1)
    expect(data.ldsObject.version).toBe(0)
    expect(data.ldsObject.algorithm.algorithm).toBe("1.3.14.3.2.26")
    expect(data.ldsObject.hashes.length).toBe(4)
})