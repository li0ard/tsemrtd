import { test, expect } from "bun:test"
import { join } from "path"
import { COM, DG1, DG2, DG3, DG7 } from "../src"

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

test("DG3", async () => {
    let data = DG3.load(await getDGContent("EF_DG3.bin"))
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("fc6508f3b7e2e4474361c4331a01046b3a4126e689ecf0e84723a1ea9aa0ae7f")
    expect(
        new Bun.CryptoHasher("sha256").update(data[1].imageData).digest().toString("hex")
    ).toBe("5850eea06329d718c9bac497b5e5979cc8f5cc61b386df65e23af13cf1263671")
})

test.todo("DG7", async () => {
    let data = DG7
})