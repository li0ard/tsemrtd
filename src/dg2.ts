import { TLV } from "@li0ard/tinytlv";
import { ISO19794FaceDecoder } from "./iso19794/face.js";
import { ISO39794FaceDecoder } from "./iso39794/face.js";
import { decodeCbeff } from "./cbeff/index.js";
import { TAGS } from "./consts/enums.js";
import type { DecodedImage } from "./consts/interfaces.js";
import { validateDataGroupTag } from "./utils.js";

/**
 * Class for working with DG2 (Face)
*/
export class DG2 {
    /**
     * Get image of face and meta info
     * @param data Data of EF.DG2 file
     */
    static load(data: string | Uint8Array): DecodedImage[] {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG2);

        return decodeCbeff<DecodedImage>(tlv, ISO19794FaceDecoder, ISO39794FaceDecoder);
    }
}