import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces, Schemas } from "./index.js";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ISO19794IrisDecoder } from "./iso19794/iris.js";

/**
 * Class for working with DG4 (Iris)
*/
export class DG4 {
    /**
     * Read Biometric data block
     * @hidden
     */
    readBDB(tlv: TLV): Interfaces.DecodedIris {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        const sbh = AsnConvert.parse(tlv.childs[0].toBytes(), Schemas.SBH);
        const firstBlock = tlv.childs[1];
        switch(parseInt(firstBlock.tag, 16)) {
            case 0x5f2e:
                return { sbh, ...ISO19794IrisDecoder.load(firstBlock) }
            case 0x7f2e:
                throw new Error(`ISO/IEC 39794 not implemented for iris images`);
            default:
                throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`)
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

        const bitCount = parseInt(bict.value, 16);
        const results = [];
        for(let i = 0; i < bitCount; i++) results.push(new DG4().readBDB(bigt.childs[i + 1]));
        return results;
    }
}