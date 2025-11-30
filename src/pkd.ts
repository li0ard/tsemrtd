import { AsnConvert } from "@peculiar/asn1-schema";
import { ContentInfo, SignedData } from "@peculiar/asn1-cms";
import { CSCAMasterList } from "./asn1/pkd.js";
import { hexToBytes } from "./utils.js";

/**
 * Class for working with CSCA master list
 * @see [ICAO Masterlist](https://www.icao.int/icao-pkd/icao-master-list)
*/
export class PKD {
    /**
     * Get CSCA certificates from master list
     * @param data Data of ICAO master list file (.ml)
     */
    static load(data: string | Uint8Array): CSCAMasterList {
        if(typeof data == "string") data = hexToBytes(data);

        const contentInfo = AsnConvert.parse(data, ContentInfo);
        const signedData = AsnConvert.parse(contentInfo.content, SignedData);
        return AsnConvert.parse(signedData.encapContentInfo.eContent!.single!, CSCAMasterList);
    }
}