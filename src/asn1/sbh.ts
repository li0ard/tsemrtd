import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import type { Enums } from "../index";

/**
 * Standard Biometric Header (SBH)
 * @hideconstructor
 */
export default class SBH {
    /** ICAO header version - Version of the CBEFF patron header format  */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 0, implicit: true, optional: true })
    version?: ArrayBuffer;

    /** Biometric type */
    @AsnProp({ type: AsnPropTypes.Integer, context: 1, implicit: true, optional: true })
    type?: Enums.CBEFFBiometricType;

    /** Biometric sub-type. (NIST IR 6529A, Table 6) */
    @AsnProp({ type: AsnPropTypes.Integer, context: 2, implicit: true, optional: true })
    sutype?: number;

    /** Creation date and time */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 3, implicit: true, optional: true })
    issueDate?: ArrayBuffer;

    /** Validity period (from through) */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 5, implicit: true, optional: true })
    expireDate?: ArrayBuffer;

    /** Creator of the biometric reference data (PID) */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 6, implicit: true, optional: true })
    creator?: ArrayBuffer;

    /** Format Owner */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 7, implicit: true })
    formatOwner: ArrayBuffer = new ArrayBuffer(0);

    /** Format Type */
    @AsnProp({ type: AsnPropTypes.OctetString, context: 8, implicit: true })
    formatType: ArrayBuffer = new ArrayBuffer(0);
}