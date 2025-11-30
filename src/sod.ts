import { TLV } from "@li0ard/tinytlv";
import { AsnConvert } from "@peculiar/asn1-schema";
import { LDSObject } from "./asn1/sod.js";
import { ContentInfo, SignedData } from "@peculiar/asn1-cms";
import { TAGS } from "./consts/enums.js";
import type { DecodedSecurtyObjectOfDocument } from "./consts/interfaces.js";
import { validateDataGroupTag } from "./utils.js";

/**
 * Class for working with SOD (Security object)
*/
export class SOD {
    /**
     * Get version, algorithm, data groups hashes
     * @param data Data of EF.SOD file
     */
    static load(data: string | Uint8Array): DecodedSecurtyObjectOfDocument {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.SOD);

        const contentInfo = AsnConvert.parse(tlv.byteValue, ContentInfo);
        const signedData = AsnConvert.parse(contentInfo.content, SignedData);
        const sod = AsnConvert.parse(signedData.encapContentInfo.eContent!.single!, LDSObject);
        return {
            certificates: signedData.certificates!,
            ldsObject: sod,
            signatures: signedData.signerInfos
        }
    }
}