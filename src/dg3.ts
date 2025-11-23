import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces, Schemas } from "./index.js";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ISO19794FingerprintDecoder } from "./iso19794/fingerprint.js";
import { ISO39794FingerprintDecoder } from "./iso39794/fingerprint.js";

/**
 * Class for working with DG3 (Fingerprint)
*/
export class DG3 {
    /**
     * Read Biometric data block
     * @hidden
     */
    readBDB(tlv: TLV): Interfaces.DecodedFingerprint {
        if(parseInt(tlv.tag, 16) != 0x7f60) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x7f60`);
        const sbh = AsnConvert.parse(tlv.childs[0].toBytes(), Schemas.SBH);
        const firstBlock = tlv.childs[1];
        switch(parseInt(firstBlock.tag, 16)) {
            case 0x5f2e:
                return { sbh, ...ISO19794FingerprintDecoder.load(firstBlock) }
            case 0x7f2e:
                return { sbh, ...ISO39794FingerprintDecoder.load(firstBlock) }
            default:
                throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x5f2e or 0x7f2e`)
        }
    }
    /**
     * Get image of fingerprint and meta info
     * @param data Data of EF.DG3 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedFingerprint[] {
        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG3) throw new Error(`Invalid DG3 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG3.toString(16)}`);

        const bigt = tlv.childs[0];
        if(parseInt(bigt.tag, 16) != 0x7f61) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x7f61`);
        
        const bict = bigt.childs[0];
        if(parseInt(bict.tag, 16) != 0x02) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x02`);

        const bitCount = parseInt(bict.value, 16);
        const results = [];
        for(let i = 0; i < bitCount; i++) results.push(new DG3().readBDB(bigt.childs[i + 1]));

        return results;
    }
}