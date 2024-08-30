import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { DigestAlgorithmIdentifier } from "@peculiar/asn1-cms";

/** Class for ASN1 schema of DataGroup hash sequence */
export class DGHash {
    /** Datagroup number */
    @AsnProp({ type: AsnPropTypes.Integer })
    number: number = 0;

    /** Datagroup hash */
    @AsnProp({ type: AsnPropTypes.OctetString })
    hash: Uint8Array = new Uint8Array();
}

/** Class for ASN1 schema of LDSSecurityObject. Described by ICAO 9303 p.10 section 4.6.2 */
export class LDSObject {
    /** Version of LDS Security Object */
    @AsnProp({ type: AsnPropTypes.Integer })
    version: 0 | 1 = 0;

    /** OID of digest algorithm */
    @AsnProp({ type: DigestAlgorithmIdentifier })
    algorithm: DigestAlgorithmIdentifier = new DigestAlgorithmIdentifier()

    /** Datagroups arrays */
    @AsnProp({ type: DGHash, repeated: "sequence" })
    hashes: DGHash[] = [];
}