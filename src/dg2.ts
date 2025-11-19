import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces, Schemas } from "./index.js";
import { AsnConvert } from "@peculiar/asn1-schema";

/**
 * Class for working with DG2 (Face)
*/
export class DG2 {
    /**
     * Extract int from Uint8Array
     * @param data Uint8Array
     * @param start Offset
     * @param end Offset+length
     */
    private extractContent(data: Uint8Array, start: number, end: number): number {
        if (end - start === 1) return data[start];
        else if (end - start < 4) return (data[start] << 8) | data[start + 1];
        return (data[start] << 24) | (data[start + 1] << 16) | (data[start + 2] << 8) | data[start + 3];
    }
    /**
     * Read Biometric data block
     * @hidden
     * @param tlv 
     */
    readBDB(tlv: TLV): Interfaces.DecodedImage {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        
        const sbh = AsnConvert.parse(tlv.childs[0].toBytes(), Schemas.SBH);
        const firstBlock = tlv.childs[1];
        if(parseInt(firstBlock.tag, 16) != 0x5f2e && parseInt(firstBlock.tag, 16) != 0x7f2e) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`);
        const data = firstBlock.byteValue;
        if(this.extractContent(data, 0, 4) != 0x46414300) throw new Error("Biometric data block is invalid");
        let offset = 4;
        
        if(this.extractContent(data, offset, offset+4) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        const lengthOfRecord = this.extractContent(data, offset, offset + 4);
        offset += 4;

        const numberOfFacialImages = this.extractContent(data, offset, offset + 2);
        offset += 2;
        if(numberOfFacialImages > 1) console.warn("[DG2] The record contains more than 1 image.");
        
        const facialRecordDataLength = this.extractContent(data, offset, offset + 4);
        offset += 4;

        const nrFeaturePoints = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const gender = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const eyeColor = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const hairColor = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const featureMask = this.extractContent(data, offset, offset + 3);
        offset += 3;

        const expression = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const poseAngle = this.extractContent(data, offset, offset + 3);
        offset += 3;

        const poseAngleUncertainty = this.extractContent(data, offset, offset + 3);
        offset += 3;
        
        offset += nrFeaturePoints * 8;

        const faceImageType = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const _imageDataType = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const imageWidth = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const imageHeight = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const imageColorSpace = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const sourceType = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const deviceType = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const quality = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        const imageEnd = facialRecordDataLength - 20 - (nrFeaturePoints * 8) - 12;
        const imageData = data.subarray(offset, offset + imageEnd);

        return {
            sbh,
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
    /**
     * Get image of face and meta info
     * @param data Data of EF.DG2 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedImage[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG2) throw new Error(`Invalid DG2 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG2.toString(16)}`);

        const bigt = tlv.childs[0];
        if(parseInt(bigt.tag, 16) != 0x7f61) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x7f61`);
        
        const bict = bigt.childs[0];
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        const bitCount = parseInt(bigt.childs[0].value, 16);
        const results = [];
        for(let i = 0; i < bitCount; i++) results.push(new DG2().readBDB(bigt.childs[i + 1]));

        return results;
    }
}