import TLV from "node-tlv"
import { Enums } from ".";

/**
 * Class for working with DG7 (Signature)
*/
export class DG7 {
    readImage(tlv: TLV): Buffer {
        if(parseInt(tlv.tag, 16) != 0x5f43) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f43`);
        return tlv.bValue
    }
    /**
     * Get image of signature
     * @param data Data of EF.DG7 file
     */
    static load(data: string | Buffer): Buffer[] {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG7) throw new Error(`Invalid DG7 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG7.toString(16)}`);

        let bict = tlv.child[0]
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        let bitCount = parseInt(bict.value, 16)
        let results: Buffer[] = []
        for(let i = 0; i < bitCount; i++) {
            results.push(new DG7().readImage(tlv.child[i + 1]))
        }
        return results
    }
}