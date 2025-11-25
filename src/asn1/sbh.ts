import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import type { Enums } from "../index.js";

/**
 * Standard Biometric Header (SBH)
 * @hideconstructor
 */
export class SBH {
    /** ICAO header version - Version of the CBEFF patron header format  */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 0, implicit: true, optional: true })
    version?: Uint8Array;

    /** Biometric type */
    @AsnProp({ type: AsnPropTypes.Integer, context: 1, implicit: true, optional: true })
    type?: Enums.CBEFFBiometricType;

    /** Biometric sub-type. (NIST IR 6529A, Table 6) */
    @AsnProp({ type: AsnPropTypes.Integer, context: 2, implicit: true, optional: true })
    subtype?: number;

    /** Creation date and time */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 3, implicit: true, optional: true })
    issueDate?: Uint8Array;

    /** Validity period (from through) */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 5, implicit: true, optional: true })
    expireDate?: Uint8Array;

    /** Creator of the biometric reference data (PID) */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 6, implicit: true, optional: true })
    creator?: Uint8Array;

    /** Format Owner */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 7, implicit: true })
    formatOwner: Uint8Array = new Uint8Array();

    /** Format Type */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 8, implicit: true })
    formatType: Uint8Array = new Uint8Array();
}