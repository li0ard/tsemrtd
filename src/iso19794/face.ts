import { TLV } from "@li0ard/tinytlv";

/** ISO/IEC 19794-5 Face image decoder */
export class ISO19794FaceDecoder {
    /** Decode biometric data block (BDB) */
    static load(firstBlock: TLV) {
        const data = new DataView(firstBlock.byteValue.buffer, firstBlock.byteValue.byteOffset, firstBlock.byteValue.byteLength);
        let offset = 0;
        
        if(data.getUint32(offset) != 0x46414300) throw new Error("Biometric data block is invalid");
        offset += 4;
        
        if(data.getUint32(offset) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        const lengthOfRecord = data.getUint32(offset);
        offset += 4;

        const numberOfFacialImages = data.getUint16(offset);
        offset += 2;
        if(numberOfFacialImages > 1) console.warn("[DG2] The record contains more than 1 image.");
        
        const facialRecordDataLength = data.getUint32(offset);
        offset += 4;

        const nrFeaturePoints = data.getUint16(offset);
        offset += 2;

        const gender = data.getUint8(offset);
        offset += 1;

        const eyeColor = data.getUint8(offset);
        offset += 1;

        const hairColor = data.getUint8(offset);
        offset += 1;

        const featureMask = (data.getUint8(offset) << 16) | (data.getUint8(offset + 1) << 8) | data.getUint8(offset + 2);
        offset += 3;

        const expression = data.getUint16(offset);
        offset += 2;

        const poseAngle = (data.getUint8(offset) << 16) | (data.getUint8(offset + 1) << 8) | data.getUint8(offset + 2);
        offset += 3;

        const poseAngleUncertainty = (data.getUint8(offset) << 16) | (data.getUint8(offset + 1) << 8) | data.getUint8(offset + 2);
        offset += 3;
        
        offset += nrFeaturePoints * 8;

        const faceImageType = data.getUint8(offset);
        offset += 1;

        const _imageDataType = data.getUint8(offset);
        offset += 1;

        const imageWidth = data.getUint16(offset);
        offset += 2;

        const imageHeight = data.getUint16(offset);
        offset += 2;

        const imageColorSpace = data.getUint8(offset);
        offset += 1;

        const sourceType = data.getUint8(offset);
        offset += 1;

        const deviceType = data.getUint16(offset);
        offset += 2;

        const quality = data.getUint16(offset);
        offset += 2;
        
        const imageEnd = facialRecordDataLength - 20 - (nrFeaturePoints * 8) - 12;
        const imageData = firstBlock.byteValue.subarray(offset, offset + imageEnd);

        return {
            lengthOfRecord,
            numberOfFacialImages,
            facialRecordDataLength,
            nrFeaturePoints,
            gender,
            eyeColor,
            hairColor,
            featureMask,
            expression,
            poseAngle,
            poseAngleUncertainty,
            faceImageType,
            imageType: _imageDataType,
            imageWidth,
            imageHeight,
            imageColorSpace,
            sourceType,
            deviceType,
            quality,
            imageData
        }
    }
}