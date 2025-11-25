import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";

/** Standard version block */
export class VersionBlock {
    /** Standard generation */
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    generation: number = 0;

    /** Standard year */
    @AsnProp({ type: AsnPropTypes.Integer, context: 1, implicit: true })
    year: number = 0;
}

/** Wrapper for unused fields */
export class GenericBlock {
    @AsnProp({ type: AsnPropTypes.Any })
    raw: Uint8Array = new Uint8Array();
}

/** Date and time block */
export class DateTimeBlock {
    /** Year */
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    year!: number;

    /** Month */
    @AsnProp({ type: AsnPropTypes.Integer, context: 1, implicit: true, optional: true })
    month?: number;

    /** Day */
    @AsnProp({ type: AsnPropTypes.Integer, context: 2, implicit: true, optional: true })
    day?: number;

    /** Hour */
    @AsnProp({ type: AsnPropTypes.Integer, context: 3, implicit: true, optional: true })
    hour?: number;

    /** Minute */
    @AsnProp({ type: AsnPropTypes.Integer, context: 4, implicit: true, optional: true })
    minute?: number;

    /** Second */
    @AsnProp({ type: AsnPropTypes.Integer, context: 5, implicit: true, optional: true })
    second?: number;

    /** Millisecond */
    @AsnProp({ type: AsnPropTypes.Integer, context: 6, implicit: true, optional: true })
    millisecond?: number;
}