import TLV from "node-tlv"
import { Enums } from "./index";
import { SubjectPublicKeyInfo } from "@peculiar/asn1-x509";
import { AsnConvert } from "@peculiar/asn1-schema";

/**
 * Class for working with DG15 (Active authentication info)
*/
export class DG15 {
    /**
     * Get active authentication public key
     * @param data Data of EF.DG15 file
     */
    static load(data: string | Buffer): SubjectPublicKeyInfo {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG15) throw new Error(`Invalid DG15 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG15.toString(16)}`);

        return AsnConvert.parse(tlv.bValue, SubjectPublicKeyInfo)
    }
}