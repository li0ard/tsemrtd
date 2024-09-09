import { AsnProp, AsnType, AsnPropTypes, AsnTypeTypes, AsnArray } from "@peculiar/asn1-schema";
import { Certificate } from "@peculiar/asn1-x509";

/** Class for ASN1 schema of Certificates set */
@AsnType({ type: AsnTypeTypes.Set, itemType: Certificate })
export class Certificates extends AsnArray<Certificate> {}

/** Class for ASN1 schema of CSCA master list. Described by ICAO 9303 p.12 section 9.2 */
export class CSCAMasterList {
    /** Master list version */
    @AsnProp({ type: AsnPropTypes.Integer })
    version: number = 0;

    /** CSCA certificates */
    @AsnProp({ type: Certificates })
    certificates: Certificates = new Certificates()
}