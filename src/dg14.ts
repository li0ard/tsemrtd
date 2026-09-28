import { TLV } from "@li0ard/tinytlv";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ChipAuthenticationDomainParameterInfo, ChipAuthenticationInfo, ChipAuthenticationPublicKeyInfo, SecurityInfos, TerminalAuthenticationInfo } from "./asn1/eac.js";
import { TAGS } from "./consts/enums.js";
import { TerminalAuthentication, ChipAuthInfo, ChipAuthPublicKey, ChipAuthDomainParameters } from "./consts/oids.js";
import { validateDataGroupTag } from "./utils.js";
import type { TArg } from "@noble/hashes/utils.js";

const caI_oids: string[] = Object.values(ChipAuthInfo),
    caPk_oids: string[] = Object.values(ChipAuthPublicKey),
    caDp_oids: string[] = Object.values(ChipAuthDomainParameters);

/**
 * Class for working with DG14 (EAC/PACE authentication info)
*/
export class DG14 {
    /**
     * Get EAC/PACE security informations
     * @param data Data of EF.DG14 file
     */
    static load(data: string | TArg<Uint8Array>): SecurityInfos {
        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG14);

        const infos = AsnConvert.parse(tlv.byteValue, SecurityInfos);
        const set = new SecurityInfos();
        for(const i of infos) {
            if(i.protocol == TerminalAuthentication)
                set.push(AsnConvert.parse(AsnConvert.serialize(i), TerminalAuthenticationInfo));
            else if(caI_oids.includes(i.protocol))
                set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationInfo));
            else if(caPk_oids.includes(i.protocol)) 
                set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationPublicKeyInfo));
            else if(caDp_oids.includes(i.protocol))
                set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationDomainParameterInfo));
            else set.push(i);
        }

        return set;
    }
}