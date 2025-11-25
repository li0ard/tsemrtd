import { TLV } from "@li0ard/tinytlv";
import { Enums, Interfaces, Utils } from "./index.js";

/**
 * Class for working with DG12 (Additional document data)
*/
export class DG12 {
    /**
     * Get additional document data
     * @param data Data of EF.DG12 file
     */
    static load(data: string | Uint8Array): Interfaces.DecodedAdditionalDocumentData {
        const ISSUING_AUTHORITY_TAG = 0x5F19;
        // yyyymmdd
        const DATE_OF_ISSUE_TAG = 0x5F26;
        // formatted per ICAO 9303 rules
        const NAME_OF_OTHER_PERSON_ARRAY_TAG = 0xA0;
        const NAME_OF_OTHER_PERSON_TAG = 0x5F1A;
        const ENDORSEMENTS_AND_OBSERVATIONS_TAG = 0x5F1B;
        const TAX_OR_EXIT_REQUIREMENTS_TAG = 0x5F1C;
        // Image per ISO/IEC 10918
        const IMAGE_OF_FRONT_TAG = 0x5F1D;
        const IMAGE_OF_REAR_TAG = 0x5F1E;
        // yyyymmddhhmmss
        const DATE_AND_TIME_OF_PERSONALIZATION = 0x5F55;
        const PERSONALIZATION_SYSTEM_SERIAL_NUMBER_TAG = 0x5F56;

        let dateOfIssue: number = 0,
            issuingAuthority: string = "",
            namesOfOtherPersons: string[] = [],
            endorsements: string = "",
            taxAndExitReqs: string = "",
            imageOfFront: Uint8Array = Uint8Array.from([]),
            imageOfRear: Uint8Array = Uint8Array.from([]),
            dateOfPersonalization: number = 0,
            personalizationNumber: string = "";

        const tlv = TLV.parse(data);
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG12) throw new Error(`Invalid DG12 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG12.toString(16)}`);
        
        for(const i of tlv.childs) {
            switch(parseInt(i.tag, 16)) {
                case ISSUING_AUTHORITY_TAG:
                    issuingAuthority = Utils.bytesToAscii(i.byteValue);
                    break;
                case DATE_OF_ISSUE_TAG:
                    dateOfIssue = parseInt(Utils.bytesToHex(i.byteValue));
                    break;
                case NAME_OF_OTHER_PERSON_ARRAY_TAG:
                    for(const j of i.childs) {
                        if(parseInt(j.tag, 16) == NAME_OF_OTHER_PERSON_TAG) namesOfOtherPersons.push(Utils.bytesToAscii(j.byteValue));
                    }
                    break;
                case ENDORSEMENTS_AND_OBSERVATIONS_TAG:
                    endorsements = Utils.bytesToAscii(i.byteValue);
                    break;
                case TAX_OR_EXIT_REQUIREMENTS_TAG:
                    taxAndExitReqs = Utils.bytesToAscii(i.byteValue);
                    break;
                case IMAGE_OF_FRONT_TAG:
                    imageOfFront = i.byteValue;
                    break;
                case IMAGE_OF_REAR_TAG:
                    imageOfRear = i.byteValue;
                    break;
                case DATE_AND_TIME_OF_PERSONALIZATION:
                    dateOfPersonalization = parseInt(Utils.bytesToHex(i.byteValue));
                    break;
                case PERSONALIZATION_SYSTEM_SERIAL_NUMBER_TAG:
                    personalizationNumber = Utils.bytesToAscii(i.byteValue);
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