import { TLV } from "@li0ard/tinytlv";
import { bytesToNumberBE } from "../utils.js";

/** ISO/IEC 19794-6 Iris image decoder */
export class ISO19794IrisDecoder {
    /** Decode biometric data block (BDB) */
    static load(firstBlock: TLV) {
        const data = new DataView(firstBlock.byteValue.buffer, firstBlock.byteValue.byteOffset, firstBlock.byteValue.byteLength);
        let offset = 0;

        if(data.getUint32(offset) != 0x49495200) throw new Error("Biometric data block is invalid");
        offset += 4;

        if(data.getUint32(offset) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        const lengthOfRecord = data.getUint32(offset);
        offset += 4;
        //const dataLength = lengthOfRecord - 45;

        const captureDeviceId = data.getUint16(offset);
        offset += 2;

        const count = data.getUint8(offset);
        offset += 1;

        if(count > 1) console.warn("[DG4] The record contains more than 1 image.");
        
        const recordHeaderLength = data.getUint16(offset);
        offset += 2;
        
        if(recordHeaderLength != 45) throw new Error(`Expected header length 45, found ${recordHeaderLength}`);

        const imagePropertiesBits = data.getUint16(offset);
        offset += 2;
        
        const irisDiameter = data.getUint16(offset);
        offset += 2;

        const imageType = data.getUint16(offset);
        offset += 2;

        const imageWidth = data.getUint16(offset);
        offset += 2;

        const imageHeight = data.getUint16(offset);
        offset += 2;

        const depth = data.getUint8(offset);
        offset += 1;

        const imageTransformation = data.getUint8(offset);
        offset += 1;

        const deviceUniqueId = bytesToNumberBE(firstBlock.byteValue.slice(offset,offset+16));
        offset += 16;

        const biometricSubtype = data.getUint8(offset);
        offset += 1;

        const biometricSubtypeCount = data.getUint16(offset);
        offset += 2;

        if(biometricSubtypeCount > 1) console.warn("[DG4] The record contains more than 1 image.");

        const imageNumber = data.getUint16(offset);
        offset += 2;
        
        const quality = data.getUint8(offset);
        offset += 1;

        const rotationAngle = data.getUint16(offset);
        offset += 2;

        const rotationAngleUncertainty = data.getUint16(offset);
        offset += 2;

        const imageEnd = data.getUint32(offset) & 0xffffffff;
        offset += 4;
        
        const imageData = firstBlock.byteValue.subarray(offset, offset + imageEnd)
        
        return {
            lengthOfRecord,
            captureDeviceId,
            imagePropertiesBits,
            irisDiameter,
            imageType,
            imageWidth,
            imageHeight,
            depth,
            imageTransformation,
            deviceUniqueId,
            biometricSubtype,
            quality,
            rotationAngle,
            rotationAngleUncertainty,
            imageData
        }
    }
}