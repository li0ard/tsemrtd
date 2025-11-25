import { test, expect } from "bun:test";
import { join } from "path";
import { DG3, Interfaces } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG3", async () => {
    const data = DG3.load(await getDGContent("EF_DG3.bin")) as Interfaces.ISO19794DecodedFingerprint[];
    expect(data[0].sbh.type).toStrictEqual(8);
    expect(data[0].sbh.subtype).toStrictEqual(9);
    expect(data[0].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatType).toStrictEqual(new Uint8Array([0,7]));
    expect(data[0].lengthOfRecord).toBe(16435);
    expect(data[0].captureDeviceId).toBe(0);
    expect(data[0].acquisitionLevel).toBe(31);
    expect(data[0].count).toBe(1);
    expect(data[0].scaleUnits).toBe(1);
    expect(data[0].scanResolutionHorizontal).toBe(500);
    expect(data[0].scanResolutionVertical).toBe(500);
    expect(data[0].imageResolutionHorizontal).toBe(500);
    expect(data[0].imageResolutionVertical).toBe(500);
    expect(data[0].depth).toBe(8);
    expect(data[0].fingerprintRecordLength).toBe(16403);
    expect(data[0].fingerImageType).toBe(0);
    expect(data[0].lengthOfRepresentations).toBe(1);
    expect(data[0].nrOfRepresention).toBe(1);
    expect(data[0].quality).toBe(100);
    expect(data[0].fingerType).toBe(2);
    expect(data[0].imageType).toBe(2);
    expect(data[0].imageWidth).toBe(620);
    expect(data[0].imageHeight).toBe(620);

    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("fc6508f3b7e2e4474361c4331a01046b3a4126e689ecf0e84723a1ea9aa0ae7f");

    expect(data[1].sbh.type).toStrictEqual(8);
    expect(data[1].sbh.subtype).toStrictEqual(10);
    expect(data[1].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[1].sbh.formatType).toStrictEqual(new Uint8Array([0,7]));
    expect(data[1].lengthOfRecord).toBe(15977);
    expect(data[1].captureDeviceId).toBe(0);
    expect(data[1].acquisitionLevel).toBe(31);
    expect(data[1].count).toBe(1);
    expect(data[1].scaleUnits).toBe(1);
    expect(data[1].scanResolutionHorizontal).toBe(500);
    expect(data[1].scanResolutionVertical).toBe(500);
    expect(data[1].imageResolutionHorizontal).toBe(500);
    expect(data[1].imageResolutionVertical).toBe(500);
    expect(data[1].depth).toBe(8);
    expect(data[1].fingerprintRecordLength).toBe(15945);
    expect(data[1].fingerImageType).toBe(0);
    expect(data[1].lengthOfRepresentations).toBe(1);
    expect(data[1].nrOfRepresention).toBe(1);
    expect(data[1].quality).toBe(100);
    expect(data[1].fingerType).toBe(7);
    expect(data[1].imageType).toBe(2);
    expect(data[1].imageWidth).toBe(620);
    expect(data[1].imageHeight).toBe(620);
    expect(
        new Bun.CryptoHasher("sha256").update(data[1].imageData).digest().toString("hex")
    ).toBe("5850eea06329d718c9bac497b5e5979cc8f5cc61b386df65e23af13cf1263671");
});

test("DG3 (ISO/IEC 39794-4)", async () => {
    const data = DG3.load(await getDGContent("EF_DG3_ISO39794_full.bin")) as Interfaces.ISO39794DecodedFingerprint[];
    expect(data[0].sbh.type).toStrictEqual(8);
    expect(data[0].sbh.subtype).toStrictEqual(9);
    expect(data[0].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatType).toStrictEqual(new Uint8Array([0,7]));

    expect(data[0].fingerImageType).toBe(1);
    expect(data[0].fingerType).toBe(2);
    expect(data[0].imageType).toBe(4);
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("6d81d55bfe847ebbd625a435e31d829f2cdafe99b76baf2b4feec7b66e066207");

    expect(data[1].sbh.type).toStrictEqual(8);
    expect(data[1].sbh.subtype).toStrictEqual(10);
    expect(data[1].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[1].sbh.formatType).toStrictEqual(new Uint8Array([0,7]));
    expect(data[1].fingerImageType).toBe(1);
    expect(data[1].fingerType).toBe(2);
    expect(data[1].imageType).toBe(4);
    expect(
        new Bun.CryptoHasher("sha256").update(data[1].imageData).digest().toString("hex")
    ).toBe("6d81d55bfe847ebbd625a435e31d829f2cdafe99b76baf2b4feec7b66e066207");
});