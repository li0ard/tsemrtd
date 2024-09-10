import TLV from "node-tlv"
import { Enums, Interfaces } from "./index";

/**
 * Class for working with DG4 (Iris)
 * @hideconstructor
 * @experimental
*/
export class DG4 {
    /**
     * Extract int from buffer
     * @hidden
     * @param data Buffer
     * @param start Offset
     * @param end Offset+length
     */
    private extractContent(data: Buffer, start: number, end: number): number {
        if (end - start == 1) {
            return data.subarray(start, end).readUInt8();
        } else if (end - start < 4) {
            return data.subarray(start, end).readInt16BE();
        }
        else if(end - start == 4) {
            return data.subarray(start,end).readInt32BE()
        }
        return parseInt(data.subarray(start,end).toString("hex"), 16)
    }
    /**
     * Read Biometric data block
     * @param tlv 
     */
    readBDB(tlv: TLV): Interfaces.DecodedIris {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        let sbh = tlv.child[0]
        let firstBlock = tlv.child[1]
        if(parseInt(firstBlock.tag, 16) != 0x5f2e && parseInt(firstBlock.tag, 16) != 0x7f2e) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`);
        let data = firstBlock.bValue

        if(data.subarray(0,4).readInt32BE() != 0x49495200) throw new Error("Biometric data block is invalid");
        let offset = 4

        if(this.extractContent(data, offset, offset+4) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        let lengthOfRecord = this.extractContent(data, offset, offset + 4);
        offset += 4;
        //let dataLength = lengthOfRecord - 45;

        let captureDeviceId = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let count = this.extractContent(data, offset, offset + 1);
        offset += 1;

        if(count > 1) console.warn("[DG4] The record contains more than 1 image.")
        
        let recordHeaderLength = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        if(recordHeaderLength != 45) throw new Error(`Expected header length 45, found ${recordHeaderLength}`);

        let imagePropertiesBits = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        let irisDiameter = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let imageType = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let imageWidth = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let imageHeight = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let depth = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let imageTransformation = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let deviceUniqueId = this.extractContent(data, offset, offset + 16);
        offset += 16;

        let biometricSubtype = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let biometricSubtypeCount = this.extractContent(data, offset, offset + 2);
        offset += 2;

        if(biometricSubtypeCount > 1) console.warn("[DG4] The record contains more than 1 image.")

        let imageNumber = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        let quality = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let rotationAngle = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let rotationAngleUncertainty = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let imageEnd = this.extractContent(data, offset, offset + 4) & 4294967295;
        offset += 4;
        
        let imageData = data.subarray(offset, offset + imageEnd)
        
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
    static load(data: string | Buffer): Interfaces.DecodedIris[] {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG4) throw new Error(`Invalid DG4 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG4.toString(16)}`);

        let bigt = tlv.child[0]
        if(parseInt(bigt.tag, 16) != 0x7f61) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x7f61`);
        
        let bict = bigt.child[0]
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        let bitCount = parseInt(bigt.child[0].value, 16)
        let results = []
        for(let i = 0; i < bitCount; i++) {
            results.push(new DG4().readBDB(bigt.child[i + 1]))
        }
        return results
    }
}