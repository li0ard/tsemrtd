import { TLV } from "@li0ard/tinytlv";
import { Enums, type Interfaces } from "./index.js";
import { AsnConvert } from "@peculiar/asn1-schema";
import { LDSObject } from "./asn1/sod.js";
import { ContentInfo, SignedData } from "@peculiar/asn1-cms";

/**
 * Class for working with SOD (Security object)
*/
export class SOD {
    /**
     * Get version, algorithm, data groups hashes
     * @param data Data of EF.SOD file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedSecurtyObjectOfDocument {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.SOD) throw new Error(`Invalid SOD tag "0x${tlv.tag}", expected 0x${Enums.TAGS.SOD.toString(16)}`);

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