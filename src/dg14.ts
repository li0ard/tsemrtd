import TLV from "node-tlv"
import { Enums, Oids } from "./index";
import { AsnConvert } from "@peculiar/asn1-schema";
import { ChipAuthenticationDomainParameterInfo, ChipAuthenticationInfo, ChipAuthenticationPublicKeyInfo, SecurityInfos, TerminalAuthenticationInfo } from "./asn1/eac";

/**
 * Class for working with DG14 (EAC/PACE authentication info)
*/
export class DG14 {
    /**
     * Get EAC/PACE security informations
     * @param data Data of EF.DG14 file
     */
    static load(data: string | Buffer): SecurityInfos {
        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG14) throw new Error(`Invalid DG14 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG14.toString(16)}`); 

        let infos = AsnConvert.parse(tlv.bValue, SecurityInfos)
        let set = new SecurityInfos()
        for(let i of infos) {
            if(i.protocol == Oids.TerminalAuthentication) {
                set.push(AsnConvert.parse(AsnConvert.serialize(i), TerminalAuthenticationInfo))
            }
            else if((Object.values(Oids.ChipAuthInfo) as string[]).includes(i.protocol)) {
                set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationInfo))
            }
            else if((Object.values(Oids.ChipAuthPublicKey) as string[]).includes(i.protocol)) {
                set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationPublicKeyInfo))
            }
            else if((Object.values(Oids.ChipAuthDomainParameters) as string[]).includes(i.protocol)) {
                set.push(AsnConvert.parse(AsnConvert.serialize(i), ChipAuthenticationDomainParameterInfo))
            }
            else {
                set.push(i)
            }
        }

        return set
    }
}