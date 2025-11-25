import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces } from "./index.js";
import { ISO19794FingerprintDecoder } from "./iso19794/fingerprint.js";
import { ISO39794FingerprintDecoder } from "./iso39794/fingerprint.js";
import { decodeCbeff } from "./cbeff/index.js";

/**
 * Class for working with DG3 (Fingerprint)
*/
export class DG3 {
    /**
     * Get image of fingerprint and meta info
     * @param data Data of EF.DG3 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedFingerprint[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG3) throw new Error(`Invalid DG3 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG3.toString(16)}`);

        return decodeCbeff<Interfaces.DecodedFingerprint>(tlv, ISO19794FingerprintDecoder, ISO39794FingerprintDecoder);
    }
}