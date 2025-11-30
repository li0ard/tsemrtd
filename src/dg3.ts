import { TLV } from "@li0ard/tinytlv";
import { ISO19794FingerprintDecoder } from "./iso19794/fingerprint.js";
import { ISO39794FingerprintDecoder } from "./iso39794/fingerprint.js";
import { decodeCbeff } from "./cbeff/index.js";
import { TAGS } from "./consts/enums.js";
import type { DecodedFingerprint } from "./consts/interfaces.js";
import { validateDataGroupTag } from "./utils.js";

/**
 * Class for working with DG3 (Fingerprint)
*/
export class DG3 {
    /**
     * Get image of fingerprint and meta info
     * @param data Data of EF.DG3 file
     */
    static load(data: string | Uint8Array): DecodedFingerprint[] {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG3);

        return decodeCbeff<DecodedFingerprint>(tlv, ISO19794FingerprintDecoder, ISO39794FingerprintDecoder);
    }
}