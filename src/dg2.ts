import TLV from "node-tlv"
import { Enums, Interfaces } from "./index";

/**
 * Class for working with DG2 (Face)
*/
export class DG2 {
    private extractContent(data: Buffer, start: number, end: number): number {
        if (end - start == 1) {
            return data.subarray(start, end).readInt8();
        } else if (end - start < 4) {
            return data.subarray(start, end).readInt16BE();
        }
        return data.subarray(start,end).readInt32BE()
    }
    readBDB(tlv: TLV): Interfaces.DecodedImage {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        
        let sbh = tlv.child[0]
        let firstBlock = tlv.child[1]
        if(parseInt(firstBlock.tag, 16) != 0x5f2e && parseInt(firstBlock.tag, 16) != 0x7f2e) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`);
        let data = firstBlock.bValue
        if(data.subarray(0,4).readInt32BE() != 0x46414300) throw new Error("Biometric data block is invalid");
        let offset = 4

        if(this.extractContent(data, offset, offset+4) != 0x30313000) throw new Error("Version of Biometric data is not valid");
        offset += 4;

        let lengthOfRecord = this.extractContent(data, offset, offset + 4);
        offset += 4;

        let numberOfFacialImages = this.extractContent(data, offset, offset + 2);
        offset += 2;
        if(numberOfFacialImages > 1) console.warn("[DG2] The record contains more than 1 image.")
        
        let facialRecordDataLength = this.extractContent(data, offset, offset + 4);
        offset += 4;

        let nrFeaturePoints = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let gender = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let eyeColor = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let hairColor = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let featureMask = this.extractContent(data, offset, offset + 3);
        offset += 3;

        let expression = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let poseAngle = this.extractContent(data, offset, offset + 3);
        offset += 3;

        let poseAngleUncertainty = this.extractContent(data, offset, offset + 3);
        offset += 3;
        
        offset += nrFeaturePoints * 8;

        let faceImageType = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let _imageDataType = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let imageWidth = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let imageHeight = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let imageColorSpace = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let sourceType = this.extractContent(data, offset, offset + 1);
        offset += 1;

        let deviceType = this.extractContent(data, offset, offset + 2);
        offset += 2;

        let quality = this.extractContent(data, offset, offset + 2);
        offset += 2;
        
        let imageEnd = facialRecordDataLength - 20 - (nrFeaturePoints * 8) - 12
        let imageData = data.subarray(offset, offset + imageEnd)

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
    static load(data: string | Buffer): Interfaces.DecodedImage[] {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG2) throw new Error(`Invalid DG2 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG2.toString(16)}`);

        let bigt = tlv.child[0]
        if(parseInt(bigt.tag, 16) != 0x7f61) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x7f61`);
        
        let bict = bigt.child[0]
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        let bitCount = parseInt(bigt.child[0].value, 16)
        let results = []
        for(let i = 0; i < bitCount; i++) {
            results.push(new DG2().readBDB(bigt.child[i + 1]))
        }
        return results
    }
}