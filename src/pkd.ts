import { AsnConvert, type OctetString } from "@peculiar/asn1-schema";
import { ContentInfo, SignedData } from "@peculiar/asn1-cms";
import { CSCAMasterList } from "./asn1/pkd";
import { Utils } from "./index";

/**
 * Class for working with CSCA master list
 * @see [ICAO Masterlist](https://www.icao.int/Security/FAL/PKD/Pages/ICAO-Master-List.aspx)
*/
export class PKD {
    /**
     * Get CSCA certificates from master list
     * @param data Data of ICAO master list file (.ml)
     */
    static load(data: string | Uint8Array): CSCAMasterList {
        if(typeof data == "string") data = Utils.hexToBytes(data);

        let contentInfo = AsnConvert.parse(data, ContentInfo)
        let signedData = AsnConvert.parse(contentInfo.content, SignedData)
        return AsnConvert.parse(signedData.encapContentInfo.eContent?.single as OctetString, CSCAMasterList)
    }
}