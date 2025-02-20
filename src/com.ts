import { TLV } from "@li0ard/tinytlv"
import { Enums, Interfaces, Utils } from "./index";

/**
 * Class for working with COM (Manifest)
*/
export class COM {
    /**
     * Get LDS and Unicode versions and data groups tags
     * @param data Data of EF.COM file
     */
    static load(data: string | Buffer): Interfaces.DecodedCom {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.COM) throw new Error(`Invalid COM tag "0x${tlv.tag}", expected 0x${Enums.TAGS.COM.toString(16)}`);
        return {
            ldsVersion: Utils.bytesToAscii(tlv.childs[0].byteValue),
            unicodeVersion: Utils.bytesToAscii(tlv.childs[1].byteValue),
            tags: tlv.childs[2].byteValue
        }
    }
}