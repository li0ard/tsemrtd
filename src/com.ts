import TLV from "node-tlv"
import { Enums, Interfaces } from ".";

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
        if(parseInt(tlv.tag, 16) != Enums.TAGS.COM) throw new Error(`Invalid DG1 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.COM.toString(16)}`);
        return {
            ldsVersion: tlv.find(0x5f01).bValue.toString("utf-8"),
            unicodeVersion: tlv.find(0x5f36).bValue.toString("utf-8"),
            tags: tlv.find(0x5c).bValue
        }
    }
}