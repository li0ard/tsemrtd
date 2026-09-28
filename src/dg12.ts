import { TLV } from "@li0ard/tinytlv";
import { TAGS } from "./consts/enums.js";
import type { DecodedAdditionalDocumentData } from "./consts/interfaces.js";
import { validateDataGroupTag, bytesToAscii } from "./utils.js";
import { bytesToHex, type TRet } from "@noble/hashes/utils.js";

const ISSUING_AUTHORITY_TAG = 0x5F19,
    // yyyymmdd
    DATE_OF_ISSUE_TAG = 0x5F26,
    // formatted per ICAO 9303 rules
    NAME_OF_OTHER_PERSON_ARRAY_TAG = 0xA0,
    NAME_OF_OTHER_PERSON_TAG = 0x5F1A,
    ENDORSEMENTS_AND_OBSERVATIONS_TAG = 0x5F1B,
    TAX_OR_EXIT_REQUIREMENTS_TAG = 0x5F1C,
    // Image per ISO/IEC 10918
    IMAGE_OF_FRONT_TAG = 0x5F1D,
    IMAGE_OF_REAR_TAG = 0x5F1E,
    // yyyymmddhhmmss
    DATE_AND_TIME_OF_PERSONALIZATION = 0x5F55,
    PERSONALIZATION_SYSTEM_SERIAL_NUMBER_TAG = 0x5F56;

/**
 * Class for working with DG12 (Additional document data)
 */
export class DG12 {
    /**
     * Get additional document data
     * @param data Data of EF.DG12 file
     */
    static load(data: string | Uint8Array): DecodedAdditionalDocumentData {
        let dateOfIssue: number = 0,
            issuingAuthority: string = "",
            namesOfOtherPersons: string[] = [],
            endorsements: string = "",
            taxAndExitReqs: string = "",
            imageOfFront: TRet<Uint8Array> = Uint8Array.from([]),
            imageOfRear: TRet<Uint8Array> = Uint8Array.from([]),
            dateOfPersonalization: number = 0,
            personalizationNumber: string = "";

        const tlv = TLV.parse(data);
        validateDataGroupTag(tlv, TAGS.DG12);
        for(const i of tlv.childs) {
            switch(parseInt(i.tag, 16)) {
                case ISSUING_AUTHORITY_TAG:
                    issuingAuthority = bytesToAscii(i.byteValue);
                    break;
                case DATE_OF_ISSUE_TAG:
                    dateOfIssue = parseInt(bytesToHex(i.byteValue));
                    break;
                case NAME_OF_OTHER_PERSON_ARRAY_TAG:
                    for(const j of i.childs)
                        if(parseInt(j.tag, 16) == NAME_OF_OTHER_PERSON_TAG) namesOfOtherPersons.push(bytesToAscii(j.byteValue));
                    break;
                case ENDORSEMENTS_AND_OBSERVATIONS_TAG:
                    endorsements = bytesToAscii(i.byteValue);
                    break;
                case TAX_OR_EXIT_REQUIREMENTS_TAG:
                    taxAndExitReqs = bytesToAscii(i.byteValue);
                    break;
                case IMAGE_OF_FRONT_TAG:
                    imageOfFront = i.byteValue as TRet<Uint8Array>;
                    break;
                case IMAGE_OF_REAR_TAG:
                    imageOfRear = i.byteValue as TRet<Uint8Array>;
                    break;
                case DATE_AND_TIME_OF_PERSONALIZATION:
                    dateOfPersonalization = parseInt(bytesToHex(i.byteValue));
                    break;
                case PERSONALIZATION_SYSTEM_SERIAL_NUMBER_TAG:
                    personalizationNumber = bytesToAscii(i.byteValue);
                    break;
            }
        }

        return {
            dateOfIssue,
            issuingAuthority,
            namesOfOtherPersons,
            endorsements,
            taxAndExitReqs,
            imageOfFront,
            imageOfRear,
            dateOfPersonalization,
            personalizationNumber
        }
    }
}