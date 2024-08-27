import TLV from "node-tlv"
import { Enums, Interfaces } from ".";

/**
 * Class for working with DG3 (Fingerprint)
 * @experimental
*/
export class DG3 {
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
    readBDB(tlv: TLV): Interfaces.DecodedFingerprint {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        let sbh = tlv.child[0]
        let firstBlock = tlv.child[1]
        if(parseInt(firstBlock.tag, 16) != 0x5f2e && parseInt(firstBlock.tag, 16) != 0x7f2e) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`);
        let data = firstBlock.bValue

        if(data.subarray(0,4).readInt32BE() != 0x46495200) throw new Error("Biometric data block is invalid");
        let offset = 4

        if(this.extractContent(data, offset, offset+4) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        let lengthOfRecord = this.extractContent(data, offset, offset + 6);
        offset += 6;

        let captureDeviceId = this.extractContent(data, offset, offset + 2)
        offset += 2;

        let acquisitionLevel = this.extractContent(data, offset, offset + 2)
        offset += 2;

        let count = this.extractContent(data, offset, offset + 1)
        offset += 1

        let scaleUnits = this.extractContent(data, offset, offset + 1)
        offset += 1
        
        let scanResolutionHorizontal = this.extractContent(data, offset, offset + 2)
        offset += 2

        let scanResolutionVertical = this.extractContent(data, offset, offset + 2)
        offset += 2
        
        let imageResolutionHorizontal = this.extractContent(data, offset, offset + 2)
        offset += 2

        let imageResolutionVertical = this.extractContent(data, offset, offset + 2)
        offset += 2

        let depth = this.extractContent(data, offset, offset + 1)
        offset += 1

        let imageType = this.extractContent(data, offset, offset + 1)
        offset += 1
        
        let reserved = this.extractContent(data, offset, offset + 2)
        offset += 2

        let fingerprintRecordLength = this.extractContent(data, offset, offset + 4)
        offset += 4
        
        let fingerType = this.extractContent(data, offset, offset + 1)
        offset += 1
        
        let lengthOfRepresentations = this.extractContent(data, offset, offset + 1)
        offset += 1

        let nrOfRepresention = this.extractContent(data, offset, offset + 1)
        offset += 1
        
        let quality = this.extractContent(data, offset, offset + 1)
        offset += 1

        let fingerImageType = this.extractContent(data, offset, offset + 1)
        offset += 1
        
        let imageWidth = this.extractContent(data, offset, offset + 2)
        offset += 2

        let imageHeight = this.extractContent(data, offset, offset + 2)
        offset += 2

        let reserved2 = this.extractContent(data, offset, offset + 1)
        offset += 1
        
        let imageData = data.subarray(offset)
        return {
            sbh,
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
    /**
     * Get image of fingerprint and meta info
     * @param data Data of EF.DG3 file
     */
    static load(data: string | Buffer): Interfaces.DecodedFingerprint[] {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG3) throw new Error(`Invalid DG3 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG3.toString(16)}`);

        let bigt = tlv.child[0]
        if(parseInt(bigt.tag, 16) != 0x7f61) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x7f61`);
        
        let bict = bigt.child[0]
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        let bitCount = parseInt(bigt.child[0].value, 16)
        let results = []
        for(let i = 0; i < bitCount; i++) {
            results.push(new DG3().readBDB(bigt.child[i + 1]))
        }
        return results
    }
}