import TLV from "node-tlv"
import { Enums, Interfaces } from "./index";

/**
 * Class for working with DG11 (Additional personal data)
*/
export class DG11 {
    /**
     * Get additional personal data
     * @param data Data of EF.DG11 file
     */
    static load(data: string | Buffer): Interfaces.DecodedAdditionalPersonalData {
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
            proofOfCitizenship: Buffer = Buffer.from(""),
            otherValidTDNumbers: string[] = [],
            custodyInformation: string = "";


        let tlv = TLV.parse(data)
        if(parseInt(tlv.tag, 16) != Enums.TAGS.DG11) throw new Error(`Invalid DG11 tag "0x${tlv.tag}", expected 0x${Enums.TAGS.DG11.toString(16)}`);
        
        for(let i of tlv.child) {
            switch(parseInt(i.tag, 16)) {
                case FULL_NAME_TAG:
                    nameOfHolder = i.bValue.toString("utf-8")
                    break;
                case PERSONAL_NUMBER_TAG:
                    personalNumber = i.bValue.toString("utf-8")
                    break;
                case OTHER_NAME_ARRAY_TAG:
                    for(let j of i.child) {
                        if(parseInt(j.tag, 16) == OTHER_NAME_TAG) {
                            otherNames.push(j.bValue.toString("utf-8"))
                        }
                    }
                    break;
                case FULL_DATE_OF_BIRTH_TAG:
                    fullDateOfBirth = parseInt(i.bValue.toString("hex"))
                    break;
                case PLACE_OF_BIRTH_TAG:
                    placeOfBirth = i.bValue.toString("utf-8").split("<")
                    break;
                case PERMANENT_ADDRESS_TAG:
                    permanentAddress = i.bValue.toString("utf-8").split("<")
                    break;
                case TELEPHONE_TAG:
                    telephone = i.bValue.toString("utf-8")
                    break
                case PROFESSION_TAG:
                    profession = i.bValue.toString("utf-8")
                    break;
                case TITLE_TAG:
                    title = i.bValue.toString("utf-8")
                    break;
                case PERSONAL_SUMMARY_TAG:
                    personalSummary = i.bValue.toString("utf-8")
                    break;
                case PROOF_OF_CITIZENSHIP_TAG:
                    proofOfCitizenship = i.bValue
                    break;
                case OTHER_VALID_TD_NUMBERS_TAG:
                    otherValidTDNumbers = i.bValue.toString("utf-8").split("<")
                    break;
                case CUSTODY_INFORMATION_TAG:
                    custodyInformation = i.bValue.toString("utf-8")
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