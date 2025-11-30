import { TLV } from "@li0ard/tinytlv";
import { TAGS } from "./consts/enums.js";
import type { DecodedAdditionalPersonalData } from "./consts/interfaces.js";
import { validateDataGroupTag, bytesToAscii } from "./utils.js";

/**
 * Class for working with DG11 (Additional personal data)
*/
export class DG11 {
    /**
     * Get additional personal data
     * @param data Data of EF.DG11 file
     */
    static load(data: string | Uint8Array): DecodedAdditionalPersonalData {
        const FULL_NAME_TAG = 0x5F0E;
        const OTHER_NAME_TAG = 0x5F0F;
        const OTHER_NAME_ARRAY_TAG = 0xA0;
        const PERSONAL_NUMBER_TAG = 0x5F10;
        // In 'CCYYMMDD' format.
        const FULL_DATE_OF_BIRTH_TAG = 0x5F2B;
        // Fields separated by '<'
        const PLACE_OF_BIRTH_TAG = 0x5F11;
        // Fields separated by '<'
        const PERMANENT_ADDRESS_TAG = 0x5F42;
        const TELEPHONE_TAG = 0x5F12;
        const PROFESSION_TAG = 0x5F13;
        const TITLE_TAG = 0x5F14;
        const PERSONAL_SUMMARY_TAG = 0x5F15;
        // Compressed image per ISO/IEC 10918
        const PROOF_OF_CITIZENSHIP_TAG = 0x5F16;
        // Separated by '<'
        const OTHER_VALID_TD_NUMBERS_TAG = 0x5F17;
        const CUSTODY_INFORMATION_TAG = 0x5F18;

        let nameOfHolder: string = "",
            otherNames: string[] = [],
            personalNumber: string = "",
            fullDateOfBirth: number = 0,
            placeOfBirth: string[] = [],
            permanentAddress: string[] = [],
            telephone: string = "",
            profession: string = "",
            title: string = "",
            personalSummary: string = "",
            proofOfCitizenship: Uint8Array = Uint8Array.from([]),
            otherValidTDNumbers: string[] = [],
            custodyInformation: string = "";

        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG11);
        
        for(const i of tlv.childs) {
            switch(parseInt(i.tag, 16)) {
                case FULL_NAME_TAG:
                    nameOfHolder = bytesToAscii(i.byteValue);
                    break;
                case PERSONAL_NUMBER_TAG:
                    personalNumber = bytesToAscii(i.byteValue);
                    break;
                case OTHER_NAME_ARRAY_TAG:
                    for(const j of i.childs) {
                        if(parseInt(j.tag, 16) == OTHER_NAME_TAG) otherNames.push(bytesToAscii(j.byteValue));
                    }
                    break;
                case FULL_DATE_OF_BIRTH_TAG:
                    fullDateOfBirth = parseInt(bytesToAscii(i.byteValue));
                    break;
                case PLACE_OF_BIRTH_TAG:
                    placeOfBirth = bytesToAscii(i.byteValue).split("<");
                    break;
                case PERMANENT_ADDRESS_TAG:
                    permanentAddress = bytesToAscii(i.byteValue).split("<");
                    break;
                case TELEPHONE_TAG:
                    telephone = bytesToAscii(i.byteValue);
                    break
                case PROFESSION_TAG:
                    profession = bytesToAscii(i.byteValue);
                    break;
                case TITLE_TAG:
                    title = bytesToAscii(i.byteValue);
                    break;
                case PERSONAL_SUMMARY_TAG:
                    personalSummary = bytesToAscii(i.byteValue);
                    break;
                case PROOF_OF_CITIZENSHIP_TAG:
                    proofOfCitizenship = i.byteValue;
                    break;
                case OTHER_VALID_TD_NUMBERS_TAG:
                    otherValidTDNumbers = bytesToAscii(i.byteValue).split("<");
                    break;
                case CUSTODY_INFORMATION_TAG:
                    custodyInformation = bytesToAscii(i.byteValue);
                    break;
            }
        }
        return {
            nameOfHolder,
            otherNames,
            personalNumber,
            fullDateOfBirth,
            placeOfBirth,
            permanentAddress,
            telephone,
            profession,
            title,
            personalSummary,
            proofOfCitizenship,
            otherValidTDNumbers,
            custodyInformation
        }
    }
}