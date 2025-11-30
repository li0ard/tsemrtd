import { TLV } from "@li0ard/tinytlv";
import { TAGS } from "./consts/enums.js";
import { validateDataGroupTag, bytesToAscii } from "./utils.js";

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
        validateDataGroupTag(tlv, TAGS.DG1);
        return bytesToAscii(tlv.childs[0].byteValue);
    }
}