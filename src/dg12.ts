import TLV from "node-tlv"
import { Enums, Interfaces } from "./index";

/**
 * Class for working with DG12 (Additional document data)
*/
export class DG12 {
    /**
     * Get additional document data
     * @param data Data of EF.DG12 file
     */
    static load(data: string | Buffer): Interfaces.DecodedAdditionalDocumentData {
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
            imageOfFront: Buffer = Buffer.from(""),
            imageOfRear: Buffer = Buffer.from(""),
            dateOfPersonalization: number = 0,
            personalizationNumber: string = ""

        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG12) throw new Error(`Invalid DG1 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG12.toString(16)}`);
        
        for(let i of tlv.child) {
            switch(parseInt(i.tag, 16)) {
                case ISSUING_AUTHORITY_TAG:
                    issuingAuthority = i.bValue.toString("utf-8")
                    break;
                case DATE_OF_ISSUE_TAG:
                    dateOfIssue = parseInt(i.bValue.toString("hex"))
                    break;
                case NAME_OF_OTHER_PERSON_ARRAY_TAG:
                    for(let j of i.child) {
                        if(parseInt(j.tag, 16) == NAME_OF_OTHER_PERSON_TAG) {
                            namesOfOtherPersons.push(j.bValue.toString("utf-8"))
                        }
                    }
                    break;
                case ENDORSEMENTS_AND_OBSERVATIONS_TAG:
                    endorsements = i.bValue.toString("utf-8")
                    break;
                case TAX_OR_EXIT_REQUIREMENTS_TAG:
                    taxAndExitReqs = i.bValue.toString("utf-8")
                    break;
                case IMAGE_OF_FRONT_TAG:
                    imageOfFront = i.bValue;
                    break;
                case IMAGE_OF_REAR_TAG:
                    imageOfRear = i.bValue;
                    break;
                case DATE_AND_TIME_OF_PERSONALIZATION:
                    dateOfPersonalization = parseInt(i.bValue.toString("hex"))
                    break;
                case PERSONALIZATION_SYSTEM_SERIAL_NUMBER_TAG:
                    personalizationNumber = i.bValue.toString("utf-8")
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