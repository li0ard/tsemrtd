import { TLV } from "@li0ard/tinytlv";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ChipAuthenticationDomainParameterInfo, ChipAuthenticationInfo, ChipAuthenticationPublicKeyInfo, SecurityInfos, TerminalAuthenticationInfo } from "./asn1/eac.js";
import { TAGS } from "./consts/enums.js";
import { TerminalAuthentication, ChipAuthInfo, ChipAuthPublicKey, ChipAuthDomainParameters } from "./consts/oids.js";
import { validateDataGroupTag } from "./utils.js";

/**
 * Class for working with DG14 (EAC/PACE authentication info)
*/
export class DG14 {
    /**
     * Get EAC/PACE security informations
     * @param data Data of EF.DG14 file
     */
    static load(data: string | Uint8Array): SecurityInfos {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG14);

        const infos = AsnConvert.parse(tlv.byteValue, SecurityInfos);
        const set = new SecurityInfos();
        for(const i of infos) {
            if(i.protocol == TerminalAuthentication) set.push(AsnConvert.parse(AsnConvert.serialize(i), TerminalAuthenticationInfo));
            else if((Object.values(ChipAuthInfo) as string[]).includes(i.protocol)) set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationInfo));
            else if((Object.values(ChipAuthPublicKey) as string[]).includes(i.protocol)) set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationPublicKeyInfo));
            else if((Object.values(ChipAuthDomainParameters) as string[]).includes(i.protocol)) set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationDomainParameterInfo));
            else set.push(i);
        }

        return set;
    }
}