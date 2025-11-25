import { test, expect } from "bun:test";
import { join } from "path";
import { DG2, Interfaces } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG2", async () => {
    const data = DG2.load(await getDGContent("EF_DG2.bin")) as Interfaces.ISO19794DecodedImage[];
    expect(data[0].sbh.type).toStrictEqual(2);
    expect(data[0].sbh.subtype).toStrictEqual(0);
    expect(data[0].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatType).toStrictEqual(new Uint8Array([0,8]));
    expect(data[0].lengthOfRecord).toBe(15045);
    expect(data[0].numberOfFacialImages).toBe(1);
    expect(data[0].facialRecordDataLength).toBe(15031);
    expect(data[0].nrFeaturePoints).toBe(0);
    expect(data[0].gender).toBe(0);
    expect(data[0].eyeColor).toBe(0);
    expect(data[0].hairColor).toBe(0);
    expect(data[0].featureMask).toBe(0);
    expect(data[0].expression).toBe(0);
    expect(data[0].poseAngle).toBe(0);
    expect(data[0].poseAngleUncertainty).toBe(0);
    expect(data[0].faceImageType).toBe(1);
    expect(data[0].imageType).toBe(1);
    expect(data[0].imageWidth).toBe(337);
    expect(data[0].imageHeight).toBe(449);
    expect(data[0].imageColorSpace).toBe(0);
    expect(data[0].sourceType).toBe(0);
    expect(data[0].deviceType).toBe(0);
    expect(data[0].quality).toBe(0);
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("45f7dcc68564616fef418cf5721ce5851c27af56fc8b762b19762b06275a1a2d");
});

test("DG2 (ISO/IEC 39794-5)", async () => {
    const data = DG2.load(await getDGContent("EF_DG2_ISO39794_full.bin")) as Interfaces.ISO39794DecodedImage[];
    expect(data[0].sbh.type).toStrictEqual(2);
    expect(data[0].sbh.subtype).toStrictEqual(0);
    expect(data[0].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatType).toStrictEqual(new Uint8Array([0,42]));

    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("53e1cbbf9194c2aba069ff7db606201e61d6a6d45213fb763cde2a169eb54bb6");
});