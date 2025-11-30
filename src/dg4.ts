import { TLV } from "@li0ard/tinytlv";
import { ISO19794IrisDecoder } from "./iso19794/iris.js";
import { ISO39794IrisDecoder } from "./iso39794/iris.js";
import { decodeCbeff } from "./cbeff/index.js";
import { TAGS } from "./consts/enums.js";
import type { DecodedIris } from "./consts/interfaces.js";
import { validateDataGroupTag } from "./utils.js";

/**
 * Class for working with DG4 (Iris)
*/
export class DG4 {
    /**
     * Get image of eye iris
     * @param data Data of EF.DG4 file
     */
    static load(data: string | Uint8Array): DecodedIris[] {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG4);

        return decodeCbeff<DecodedIris>(tlv, ISO19794IrisDecoder, ISO39794IrisDecoder);
    }
}