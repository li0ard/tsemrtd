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