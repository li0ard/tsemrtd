import TLV from "node-tlv"
import { Enums } from "./index";
import { AsnConvert } from "@peculiar/asn1-schema";
import { SecurityInfos } from "./asn1/eac";

/**
 * Class for working with DG14 (EAC/PACE authentication info)
*/
export class DG14 {
    /**
     * Get EAC/PACE security informations
     * @param data Data of EF.DG14 file
     */
    static load(data: string | Buffer): SecurityInfos {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG14) throw new Error(`Invalid DG14 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG14.toString(16)}`);

        return AsnConvert.parse(tlv.bValue, SecurityInfos)
    }
}