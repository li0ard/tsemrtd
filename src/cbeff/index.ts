import type { TLV } from "@li0ard/tinytlv";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ISO7816Tags } from "../consts/enums.js";
import { SBH } from "../asn1/index.js";
import type { BDBDecoder } from "../consts/interfaces.js";

/**
 * CBEFF decoder
 * @param tlv Biometric information group template
 * @param iso19794Decoder ISO/IEC 19794 decoder for biometric type
 * @param iso39794Decoder ISO/IEC 39794 decoder for biometric type
 */
export const decodeCbeff = <T = any>(tlv: TLV, iso19794Decoder?: BDBDecoder, iso39794Decoder?: BDBDecoder): T[] => {
    const bigt = tlv.childs[0];
    if(parseInt(bigt.tag, 16) != ISO7816Tags.BIOMETRIC_INFORMATION_GROUP_TEMPLATE) throw new Error(`Invalid object tag "0x${bigt.tag}", expected 0x${ISO7816Tags.BIOMETRIC_INFORMATION_GROUP_TEMPLATE.toString(16)}`);

    const bict = bigt.childs[0];
    if(parseInt(bict.tag, 16) != ISO7816Tags.BIOMETRIC_INFO_COUNT) throw new Error(`Invalid object tag "0x${bict.tag}", expected 0x${ISO7816Tags.BIOMETRIC_INFO_COUNT.toString(16)}`);
    
    const results: T[] = [];
    for(let i = 0; i < parseInt(bict.value, 16); i++) {
        const record = bigt.childs[i + 1];
        if(parseInt(record.tag, 16) != ISO7816Tags.BIOMETRIC_INFORMATION_TEMPLATE) throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x${ISO7816Tags.BIOMETRIC_INFORMATION_TEMPLATE.toString(16)}`);

        const sbh = AsnConvert.parse(record.childs[0].toBytes(), SBH);
        const bdb = record.childs[1];

        switch(parseInt(bdb.tag, 16)) {
            case ISO7816Tags.BIOMETRIC_DATA_BLOCK:
                if(iso19794Decoder) results.push({ sbh, ...iso19794Decoder.load(bdb) });
                break;
            case ISO7816Tags.BIOMETRIC_DATA_BLOCK_CONSTRUCTED:
                if(iso39794Decoder) results.push({ sbh, ...iso39794Decoder.load(bdb) });
                break;
            default:
                throw new Error(`Invalid object tag "0x${tlv.tag}", expected 0x${ISO7816Tags.BIOMETRIC_DATA_BLOCK.toString(16)} or 0x${ISO7816Tags.BIOMETRIC_DATA_BLOCK_CONSTRUCTED.toString(16)}`);
        }
    }

    return results;
}