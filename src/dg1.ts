import { TLV } from "@li0ard/tinytlv";
import { Enums, Utils } from "./index.js";

/**
 * Class for working with DG1 (MRZ)
*/
export class DG1 {
    /**
     * Get MRZ
     * @param data Data of EF.DG1 file
     */
    static load(data: string | Uint8Array): string {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG1) throw new Error(`Invalid DG1 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG1.toString(16)}`);
        return Utils.bytesToAscii(tlv.childs[0].byteValue);
    }
}