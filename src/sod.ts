import { TLV } from "@li0ard/tinytlv"
import { Enums, type Interfaces } from "./index";
import { AsnConvert, OctetString } from "@peculiar/asn1-schema";
import { LDSObject } from "./asn1/sod";
import { type CertificateSet, ContentInfo, SignedData } from "@peculiar/asn1-cms";

/**
 * Class for working with SOD (Security object)
*/
export class SOD {
    /**
     * Get version, algorithm, data groups hashes
     * @param data Data of EF.SOD file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedSecurtyObjectOfDocument {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.SOD) throw new Error(`Invalid SOD tag "0x${tlv.tag}", expected 0x${Enums.TAGS.SOD.toString(16)}`);

        let contentInfo = AsnConvert.parse(tlv.byteValue, ContentInfo)
        let signedData = AsnConvert.parse(contentInfo.content, SignedData)
        let sod = AsnConvert.parse(signedData.encapContentInfo.eContent?.single as OctetString, LDSObject)
        return {
            certificates: signedData.certificates as CertificateSet,
            ldsObject: sod,
            signatures: signedData.signerInfos
        }
    }
}