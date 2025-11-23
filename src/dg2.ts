import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces, Schemas } from "./index.js";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ISO19794FaceDecoder } from "./iso19794/face.js";
import { ISO39794FaceDecoder } from "./iso39794/face.js";

/**
 * Class for working with DG2 (Face)
*/
export class DG2 {
    /**
     * Read Biometric data block
     * @hidden
     */
    readBDB(tlv: TLV): Interfaces.DecodedImage {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        
        const sbh = AsnConvert.parse(tlv.childs[0].toBytes(), Schemas.SBH);
        const firstBlock = tlv.childs[1];
        switch(parseInt(firstBlock.tag, 16)) {
            case 0x5f2e:
                return { sbh, ...ISO19794FaceDecoder.load(firstBlock) }
            case 0x7f2e:
                return { sbh, ...ISO39794FaceDecoder.load(firstBlock) }
            default:
                throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`)
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

        const bitCount = parseInt(bict.value, 16);
        const results = [];
        for(let i = 0; i < bitCount; i++) results.push(new DG2().readBDB(bigt.childs[i + 1]));

        return results;
    }
}