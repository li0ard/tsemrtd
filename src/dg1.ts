import TLV from "node-tlv"
import { Enums } from ".";

/**
 * Class for working with DG1 (MRZ)
*/
export class DG1 {
    /**
     * Get MRZ
     * @param data Data of EF.DG1 file
     */
    static load(data: string | Buffer): string {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG1) throw new Error(`Invalid DG1 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG1.toString(16)}`);
        return tlv.find(0x5f1f).bValue.toString("utf-8")
    }
}