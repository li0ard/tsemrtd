import { AsnProp, AsnType, AsnPropTypes, AsnTypeTypes, AsnArray } from "@peculiar/asn1-schema";

/** Class for ASN1 schema of EAC/PACE Security info sequence */
export class SecurityInfo {
    /** OID of protocol */
    @AsnProp({ type: AsnPropTypes.ObjectIdentifier })
    protocol: string = "";

    /** Required data defined by protocol */
    @AsnProp({ type: AsnPropTypes.Any })
    requiredData: any;

    /** Optional data defined by protocol */
    @AsnProp({ type: AsnPropTypes.Any, optional: true })
    optionalData?: any;
}

/** Class for ASN1 schema of SecurityInfo set. Described by ICAO 9303 p.10 section 4.7.14.2 */
@AsnType({ type: AsnTypeTypes.Set, itemType: SecurityInfo })
export class SecurityInfos extends AsnArray<SecurityInfo> {}