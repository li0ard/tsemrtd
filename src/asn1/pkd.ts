import { CertificateSet } from "@peculiar/asn1-cms";
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";

/** Class for ASN1 schema of CSCA master list. Described by ICAO 9303 p.12 section 9.2 */
export class CSCAMasterList {
    /** Master list version */
    @AsnProp({ type: AsnPropTypes.Integer })
    version: number = 0;

    /** CSCA certificates */
    @AsnProp({ type: CertificateSet })
    certificates: CertificateSet = new CertificateSet()
}