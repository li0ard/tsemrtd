import { TLV } from "@li0ard/tinytlv"
import { Enums } from "./index";

/**
 * Class for working with DG5 (Displayed image)
*/
export class DG5 {
    readImage(tlv: TLV): Uint8Array {
        if(parseInt(tlv.tag, 16) != 0x5f40) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f40`);
        return tlv.byteValue
    }
    /**
     * Get displayed image
     * @param data Data of EF.DG5 file
     */
    static load(data: string | Uint8Array): Uint8Array[] {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG5) throw new Error(`Invalid DG5 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG5.toString(16)}`);

        let bict = tlv.childs[0]
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        let bitCount = parseInt(bict.value, 16)
        let results: Uint8Array[] = []
        for(let i = 0; i < bitCount; i++) {
            results.push(new DG5().readImage(tlv.childs[i + 1]))
        }
        return results
    }
}