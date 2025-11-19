import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces, Schemas, Utils } from "./index.js";
import { AsnConvert } from "@peculiar/asn1-schema";

/**
 * Class for working with DG4 (Iris)
 * @hideconstructor
 * @experimental
*/
export class DG4 {
    /**
     * Extract int from Uint8Array
     * @hidden
     * @param data Uint8Array
     * @param start Offset
     * @param end Offset+length
     */
    private extractContent(data: Uint8Array, start: number, end: number): number {
        if (end - start === 1) return data[start];
        else if (end - start < 4) return (data[start] << 8) | data[start + 1];
        else if(end - start == 4) return (data[start] << 24) | (data[start + 1] << 16) | (data[start + 2] << 8) | data[start + 3];
        return parseInt(Utils.bytesToHex(data.slice(start,end)), 16);
    }
    /**
     * Read Biometric data block
     * @param tlv 
     */
    readBDB(tlv: TLV): Interfaces.DecodedIris {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        const sbh = AsnConvert.parse(tlv.childs[0].toBytes(), Schemas.SBH);
        const firstBlock = tlv.childs[1];
        if(parseInt(firstBlock.tag, 16) != 0x5f2e && parseInt(firstBlock.tag, 16) != 0x7f2e) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`);
        const data = firstBlock.byteValue;

        if(this.extractContent(data, 0, 4) != 0x49495200) throw new Error("Biometric data block is invalid");
        let offset = 4;

        if(this.extractContent(data, offset, offset+4) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        const lengthOfRecord = this.extractContent(data, offset, offset + 4);
        offset += 4;
        //const dataLength = lengthOfRecord - 45;

        const captureDeviceId = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const count = this.extractContent(data, offset, offset + 1);
        offset += 1;

        if(count > 1) console.warn("[DG4] The record contains more than 1 image.");
        
        const recordHeaderLength = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        if(recordHeaderLength != 45) throw new Error(`Expected header length 45, found ${recordHeaderLength}`);

        const imagePropertiesBits = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        const irisDiameter = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const imageType = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const imageWidth = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const imageHeight = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const depth = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const imageTransformation = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const deviceUniqueId = this.extractContent(data, offset, offset + 16);
        offset += 16;

        const biometricSubtype = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const biometricSubtypeCount = this.extractContent(data, offset, offset + 2);
        offset += 2;

        if(biometricSubtypeCount > 1) console.warn("[DG4] The record contains more than 1 image.");

        const imageNumber = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        const quality = this.extractContent(data, offset, offset + 1);
        offset += 1;

        const rotationAngle = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const rotationAngleUncertainty = this.extractContent(data, offset, offset + 2);
        offset += 2;

        const imageEnd = this.extractContent(data, offset, offset + 4) & 0xffffffff;
        offset += 4;
        
        const imageData = data.subarray(offset, offset + imageEnd)
        
        return {
            sbh,
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
    /**
     * Get image of eye iris
     * @param data Data of EF.DG4 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedIris[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG4) throw new Error(`Invalid DG4 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG4.toString(16)}`);

        const bigt = tlv.childs[0];
        if(parseInt(bigt.tag, 16) != 0x7f61) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x7f61`);
        
        const bict = bigt.childs[0];
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        const bitCount = parseInt(bigt.childs[0].value, 16);
        const results = [];
        for(let i = 0; i < bitCount; i++) results.push(new DG4().readBDB(bigt.childs[i + 1]));
        return results;
    }
}