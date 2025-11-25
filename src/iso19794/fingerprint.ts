import { TLV } from "@li0ard/tinytlv";
import { Utils } from "../index.js";

/** ISO/IEC 19794-4 Fingerprint image decoder */
export class ISO19794FingerprintDecoder {
    /** Decode biometric data block (BDB) */
    static load(firstBlock: TLV) {
        const data = new DataView(firstBlock.byteValue.buffer, firstBlock.byteValue.byteOffset, firstBlock.byteValue.byteLength);
        let offset = 0;

        if(data.getUint32(offset) != 0x46495200) throw new Error("Biometric data block is invalid");
        offset += 4;

        if(data.getUint32(offset) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        const lengthOfRecord = Number(Utils.bytesToNumberBE(firstBlock.byteValue.slice(offset,offset+6)));
        offset += 6;

        const captureDeviceId = data.getUint16(offset);
        offset += 2;

        const acquisitionLevel = data.getUint16(offset);
        offset += 2;

        const count = data.getUint8(offset);
        offset += 1;

        const scaleUnits = data.getUint8(offset);
        offset += 1;
        
        const scanResolutionHorizontal = data.getUint16(offset);
        offset += 2;

        const scanResolutionVertical = data.getUint16(offset);
        offset += 2;
        
        const imageResolutionHorizontal = data.getUint16(offset);
        offset += 2;

        const imageResolutionVertical = data.getUint16(offset);
        offset += 2;

        const depth = data.getUint8(offset);
        offset += 1;

        const imageType = data.getUint8(offset);
        offset += 1;
        
        const reserved = data.getUint16(offset);
        offset += 2;

        const fingerprintRecordLength = data.getUint32(offset);
        offset += 4;
        
        const fingerType = data.getUint8(offset);
        offset += 1;
        
        const lengthOfRepresentations = data.getUint8(offset);
        offset += 1;

        const nrOfRepresention = data.getUint8(offset);
        offset += 1;
        
        const quality = data.getUint8(offset);
        offset += 1;

        const fingerImageType = data.getUint8(offset);
        offset += 1;
        
        const imageWidth = data.getUint16(offset);
        offset += 2;

        const imageHeight = data.getUint16(offset);
        offset += 2;

        const reserved2 = data.getUint8(offset);
        offset += 1;
        
        const imageEnd = fingerprintRecordLength - 14;
        const imageData = firstBlock.byteValue.subarray(offset, offset + imageEnd);
        return {
            lengthOfRecord,
            captureDeviceId,
            acquisitionLevel,
            count,
            scaleUnits,
            scanResolutionHorizontal,
            scanResolutionVertical,
            imageResolutionHorizontal,
            imageResolutionVertical,
            depth,
            fingerprintRecordLength,
            fingerImageType,
            lengthOfRepresentations,
            nrOfRepresention,
            quality,
            fingerType,
            imageType,
            imageWidth,
            imageHeight,
            imageData
        }
    }
}