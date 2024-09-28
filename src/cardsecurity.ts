import { AsnConvert, OctetString } from "@peculiar/asn1-schema";
import { SecurityInfos } from "./asn1/eac";
import { CertificateSet, ContentInfo, SignedData } from "@peculiar/asn1-cms";
import { Interfaces } from "./index";

/**
 * Class for working with EF.CardSecurity
 * @hideconstructor
 * @experimental
*/
export class CardSecurity {
    /**
     * Get EAC/PACE security informations
     * @param data Data of EF.CardSecurity file
     */
    static load(data: Buffer): Interfaces.DecodedCardSecurity {
        let contentInfo = AsnConvert.parse(data, ContentInfo)
        let signedData = AsnConvert.parse(contentInfo.content, SignedData)
        let securityInfos = AsnConvert.parse(signedData.encapContentInfo.eContent?.single as OctetString, SecurityInfos)
        return {
            certificates: signedData.certificates as CertificateSet,
            securityInfos: securityInfos,
            signatures: signedData.signerInfos
        }
    }
}