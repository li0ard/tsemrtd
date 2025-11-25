import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces } from "./index.js";
import { ISO19794FaceDecoder } from "./iso19794/face.js";
import { ISO39794FaceDecoder } from "./iso39794/face.js";
import { decodeCbeff } from "./cbeff/index.js";

/**
 * Class for working with DG2 (Face)
*/
export class DG2 {
    /**
     * Get image of face and meta info
     * @param data Data of EF.DG2 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedImage[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG2) throw new Error(`Invalid DG2 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG2.toString(16)}`);

        return decodeCbeff<Interfaces.DecodedImage>(tlv, ISO19794FaceDecoder, ISO39794FaceDecoder);
    }
}