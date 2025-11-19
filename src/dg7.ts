import { TLV } from "@li0ard/tinytlv";
import { Enums } from "./index.js";

/**
 * Class for working with DG7 (Signature)
*/
export class DG7 {
    readImage(tlv: TLV): Uint8Array {
        if(parseInt(tlv.tag, 16) != 0x5f43) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f43`);
        return tlv.byteValue
    }
    /**
     * Get image of signature
     * @param data Data of EF.DG7 file
     */
    static load(data: string | Uint8Array): Uint8Array[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG7) throw new Error(`Invalid DG7 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG7.toString(16)}`);

        const bict = tlv.childs[0];
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        const bitCount = parseInt(bict.value, 16);
        const results: Uint8Array[] = [];
        for(let i = 0; i < bitCount; i++) results.push(new DG7().readImage(tlv.childs[i + 1]));
        return results;
    }
}