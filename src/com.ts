import { TLV } from "@li0ard/tinytlv";
import { TAGS } from "./consts/enums.js";
import type { DecodedCom } from "./consts/interfaces.js";
import { validateDataGroupTag, bytesToAscii } from "./utils.js";

/**
 * Class for working with COM (Manifest)
*/
export class COM {
    /**
     * Get LDS and Unicode versions and data groups tags
     * @param data Data of EF.COM file
     */
    static load(data: string | Uint8Array): DecodedCom {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.COM);
        return {
            ldsVersion: bytesToAscii(tlv.childs[0].byteValue),
            unicodeVersion: bytesToAscii(tlv.childs[1].byteValue),
            tags: tlv.childs[2].byteValue
        }
    }
}