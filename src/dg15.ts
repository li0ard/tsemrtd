import { TLV } from "@li0ard/tinytlv";
import { SubjectPublicKeyInfo } from "@peculiar/asn1-x509";
import { AsnConvert } from "@peculiar/asn1-schema";
import { TAGS } from "./consts/enums.js";
import { validateDataGroupTag } from "./utils.js";

/**
 * Class for working with DG15 (Active authentication info)
*/
export class DG15 {
    /**
     * Get active authentication public key
     * @param data Data of EF.DG15 file
     */
    static load(data: string | Uint8Array): SubjectPublicKeyInfo {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG15);

        return AsnConvert.parse(tlv.byteValue, SubjectPublicKeyInfo);
    }
}