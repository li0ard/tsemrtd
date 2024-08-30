import type TLV from "node-tlv";
import type { EyeColor, FaceType, FingerImageType, FingerType, FingerprintImageType, Gender, HairColor, ImageColorSpace, ImageType, ImageUnit, SourceType } from "./enums";

interface AbstractBioTemplate {
    /** Standart Biometric Header. Described by ICAO 9303 p.10 section 4.7.2.1*/
    sbh: TLV,
    /** Length of record */
    lengthOfRecord: number,
    /** Image Data Type */
    imageType: any,
    /** Image width */
    imageWidth: number,
    /** Image height */
    imageHeight: number,
    /** Image quality */
    quality: number,
    /** Raw image data */
    imageData: Buffer
}

/** Decoded EF.COM datagroup */
export interface DecodedCom {
    /** Version of LDS structure */
    ldsVersion: string,
    /** Version of Unicode table */
    unicodeVersion: string,
    /** Datagroups defined in MRTD */
    tags: Buffer
}

/** Decoded EF.DG2 datagroup */
export interface DecodedImage extends AbstractBioTemplate {
    /** Number of facial images */
    numberOfFacialImages: number,
    /** Length of facial record data */
    facialRecordDataLength: number,
    /** Number of control points */
    nrFeaturePoints: number,
    /** Gender */
    gender: Gender,
    /** Eye color */
    eyeColor: EyeColor,
    /** Hair color */
    hairColor: HairColor,
    /** Features Mask */
    featureMask: number,
    /** Facial expression */
    expression: number,
    /** Angular coordinates */
    poseAngle: number,
    /** Error of angular coordinates */
    poseAngleUncertainty: number,
    /** Type of face image */
    faceImageType: FaceType,
    /** Image color space */
    imageColorSpace: ImageColorSpace,
    /** Image source type */
    sourceType: SourceType,
    /** Image device type */
    deviceType: number
}

/** Decoded EF.DG3 datagroup */
export interface DecodedFingerprint extends AbstractBioTemplate {
    /** ID of the biometric scanner */
    captureDeviceId: number,
    /** Level of image acquisition settings */
    acquisitionLevel: number,
    /** Number of finger/palm images */
    count: number,
    /** Unit of measurement of resolution */
    scaleUnits: ImageUnit,
    /** Scan resolution (horizontal) */
    scanResolutionHorizontal: number,
    /** Scan resolution (vertical) */
    scanResolutionVertical: number,
    /** Image resolution (horizontal) */
    imageResolutionHorizontal: number,
    /** Image resolution (vertical) */
    imageResolutionVertical: number,
    /** Bit depth of the grayscale scale */
    depth: number,
    /** Length of fingerprint/palm image data block */
    fingerprintRecordLength: number,
    /** Type of fingerprint and palm image */
    fingerImageType: FingerImageType,
    /** Count of fingerprint representations */
    lengthOfRepresentations: number,
    /** Number of fingerprint representation */
    nrOfRepresention: number,
    /** Name of finger/part of palm */
    fingerType: FingerType
}

/** Decoded EF.DG11 datagroup */
export interface DecodedAdditionalPersonalData {
    /** Full name of document holder */
    nameOfHolder: string,
    /** Other names of document holder */
    otherNames: string[],
    /** Personal number */
    personalNumber: string,
    /** Full date of birth (CCYYMMDD) */
    fullDateOfBirth: number,
    /** Place of birth */
    placeOfBirth: string[],
    /** Permanent residence address */
    permanentAddress: string[],
    /** Phone number */
    telephone: string,
    /** Profession */
    profession: string,
    /** Position */
    title: string,
    /** Personal resume */
    personalSummary: string,
    /** Proof of citizenship. Image described by ISO/IEC 10918 */
    proofOfCitizenship: Buffer,
    /** Numbers of other valid TDs */
    otherValidTDNumbers: string[],
    /**  Information about detention */
    custodyInformation: string
}

/** Decoded EF.DG12 datagroup */
export interface DecodedAdditionalDocumentData {
    /** Full date of issue (YYYYMMDD) */
    dateOfIssue: number,
    /** Issuing authority */
    issuingAuthority: string,
    /** Name of another person, formatted according to the rules of Doc 9303 */
    namesOfOtherPersons: string[],
    /** Endorsements and observations */
    endorsements: string,
    /** Tax and exit requirements */
    taxAndExitReqs: string,
    /** Image of front of document. Image described by ISO/IEC 10918 */
    imageOfFront: Buffer,
    /** Image of rear of document. Image described by ISO/IEC 10918 */
    imageOfRear: Buffer,
    /** Date and time of document personalization (YYYYMMDDHHMMSS) */
    dateOfPersonalization: number,
    /** Serial number of personalization system */
    personalizationNumber: string
}