import { test, expect } from "bun:test";
import { join } from "path";
import { DG4, Interfaces } from "../src/index.js";

const getDGContent = async (name: string): Promise<Uint8Array> => await Bun.file(join(import.meta.dir, "dgs", name)).bytes();

test("DG4", async () => {
    const data = DG4.load(await getDGContent("EF_DG4.bin")) as Interfaces.ISO19794DecodedIris[];
    expect(data[0].sbh.type).toStrictEqual(16);
    expect(data[0].sbh.subtype).toStrictEqual(1);
    expect(data[0].sbh.version).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatType).toStrictEqual(new Uint8Array([0,9]));
    expect(data[0].lengthOfRecord).toBe(6445);
    expect(data[0].captureDeviceId).toBe(0);
    expect(data[0].imagePropertiesBits).toBe(0);
    expect(data[0].irisDiameter).toBe(150);
    expect(data[0].imageType).toBe(16);
    expect(data[0].imageWidth).toBe(163);
    expect(data[0].imageHeight).toBe(149);
    expect(data[0].depth).toBe(24);
    expect(data[0].imageTransformation).toBe(0);
    expect(data[0].deviceUniqueId).toBe(0n);
    expect(data[0].biometricSubtype).toBe(1);
    expect(data[0].quality).toBe(51);
    expect(data[0].rotationAngle).toBe(65535);
    expect(data[0].rotationAngleUncertainty).toBe(65535);
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("26ea8a8b009d066558326fd3db137aca345af6acaf574caf034fc0a4f89a5bef");

    expect(data[1].sbh.type).toStrictEqual(16);
    expect(data[1].sbh.subtype).toStrictEqual(2);
    expect(data[1].sbh.version).toStrictEqual(new Uint8Array([1,1]));
    expect(data[1].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[1].sbh.formatType).toStrictEqual(new Uint8Array([0,9]));
    expect(data[1].lengthOfRecord).toBe(6777);
    expect(data[1].captureDeviceId).toBe(0);
    expect(data[1].imagePropertiesBits).toBe(0);
    expect(data[1].irisDiameter).toBe(150);
    expect(data[1].imageType).toBe(16);
    expect(data[1].imageWidth).toBe(160);
    expect(data[1].imageHeight).toBe(152);
    expect(data[1].depth).toBe(24);
    expect(data[1].imageTransformation).toBe(0);
    expect(data[1].deviceUniqueId).toBe(0n);
    expect(data[1].biometricSubtype).toBe(2);
    expect(data[1].quality).toBe(51);
    expect(data[1].rotationAngle).toBe(65535);
    expect(data[1].rotationAngleUncertainty).toBe(65535);
    expect(
        new Bun.CryptoHasher("sha256").update(data[1].imageData).digest().toString("hex")
    ).toBe("84964fe5829a960b1546f4f2a20afc65c05c1163b7ef8094ad0027b7c8541516");
});

test("DG4 (ISO/IEC 39794-6)", async () => {
    const data = DG4.load(await getDGContent("EF_DG4_ISO39794_full.bin")) as Interfaces.ISO39794DecodedIris[];

    expect(data[0].sbh.type).toStrictEqual(16);
    expect(data[0].sbh.subtype).toStrictEqual(1);
    expect(data[0].sbh.version).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[0].sbh.formatType).toStrictEqual(new Uint8Array([0,9]));
    expect(data[0].biometricSubtype).toBe(1);
    expect(data[0].imageType).toBe(2);
    expect(data[0].depth).toBe(8);
    expect(
        new Bun.CryptoHasher("sha256").update(data[0].imageData).digest().toString("hex")
    ).toBe("0287c96b519e6ec82fdb4d01b2de45d5dd8c759124bc51831ab09339fd9c80c7");

    expect(data[1].sbh.type).toStrictEqual(16);
    expect(data[1].sbh.subtype).toStrictEqual(2);
    expect(data[1].sbh.version).toStrictEqual(new Uint8Array([1,1]));
    expect(data[1].sbh.formatOwner).toStrictEqual(new Uint8Array([1,1]));
    expect(data[1].sbh.formatType).toStrictEqual(new Uint8Array([0,9]));
    expect(data[1].biometricSubtype).toBe(1);
    expect(data[1].imageType).toBe(2);
    expect(data[1].depth).toBe(8);
    expect(
        new Bun.CryptoHasher("sha256").update(data[1].imageData).digest().toString("hex")
    ).toBe("0287c96b519e6ec82fdb4d01b2de45d5dd8c759124bc51831ab09339fd9c80c7");
});