import TLV from "node-tlv"
import { Enums, Interfaces } from "./index";

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
            ldsVersion: tlv.child[0].bValue.toString("utf-8"),
            unicodeVersion: tlv.child[1].bValue.toString("utf-8"),
            tags: tlv.child[2].bValue
        }
    }
}