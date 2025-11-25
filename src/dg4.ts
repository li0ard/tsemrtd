import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces } from "./index.js";
import { ISO19794IrisDecoder } from "./iso19794/iris.js";
import { ISO39794IrisDecoder } from "./iso39794/iris.js";
import { decodeCbeff } from "./cbeff/index.js";

/**
 * Class for working with DG4 (Iris)
*/
export class DG4 {
    /**
     * Get image of eye iris
     * @param data Data of EF.DG4 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedIris[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG4) throw new Error(`Invalid DG4 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG4.toString(16)}`);

        return decodeCbeff<Interfaces.DecodedIris>(tlv, ISO19794IrisDecoder, ISO39794IrisDecoder);
    }
}