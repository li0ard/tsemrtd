// Common

/** Data groups tags */
export enum TAGS {
    COM = 0x60,
    DG1 = 0x61,
    DG2 = 0x75,
    DG3 = 0x63,
    DG4 = 0x76,
    DG5 = 0x65,
    DG6 = 0x66,
    DG7 = 0x67,
    DG8 = 0x68,
    DG9 = 0x69,
    DG10 = 0x6a,
    DG11 = 0x6b,
    DG12 = 0x6c,
    DG13 = 0x6d,
    DG14 = 0x6e,
    DG15 = 0x6f,
    DG16 = 0x70,
    SOD = 0x77
}

// CBEFF

/** ISO/IEC 7816-11 tags */
export enum ISO7816Tags {
    BIOMETRIC_INFORMATION_GROUP_TEMPLATE = 0x7F61,
    BIOMETRIC_INFORMATION_TEMPLATE = 0x7F60,
    BIOMETRIC_INFO_COUNT = 2,
    BIOMETRIC_HEADER_TEMPLATE_BASE = 0xA1,
    BIOMETRIC_DATA_BLOCK = 0x5F2E,
    BIOMETRIC_DATA_BLOCK_CONSTRUCTED = 0x7F2E
}

/** NIST IR 6529A. Table 4 – Biometric Type */
export enum CBEFFBiometricType {
    UNSPECIFIED = 0x00,
    MULTIPLE = 0x01,
    FACIAL_FEATURES = 0x02,
    VOICE = 0x04,
    FINGERPRINT = 0x08,
    IRIS = 0x10,
    RETINA = 0x20,
    HAND_GEOMETRY = 0x40,
    SIGNATURE_DYNAMICS = 0x80,
    KEYSTROKE_DYNAMICS = 0x100,
    LIP_MOVEMENT = 0x200,
    THERMAL_FACE_IMAGE = 0x400,
    THERMAL_HAND_IMAGE = 0x800,
    GAIT = 0x1000,
    BODY_ODOR = 0x2000,
    DNA = 0x4000,
    EAR_SHAPE = 0x8000,
    FINGER_GEOMETRY = 0x10000,
    PALM_PRINT = 0x20000,
    VEIN_PATTERN = 0x40000,
    FOOT_PRINT = 0x80000
}

// DG2

/** ISO/IEC 19794-5. Gender */
export enum Gender {
    UNSPECIFIED = 0x00,
    MALE = 0x01,
    FEMALE = 0x02,
    UNKNOWN = 0xff
}

/** ISO/IEC 19794-5. Eye color */
export enum EyeColor {
    UNSPECIFIED = 0x00,
    BLACK = 0x01,
    BLUE = 0x02,
    BROWN = 0x03,
    GRAY = 0x04,
    GREEN = 0x05,
    HETEROCHROMIC = 0x06,
    PINK = 0x07,
    OTHER = 0xff
}

/** ISO/IEC 19794-5. Hair color */
export enum HairColor {
    UNSPECIFIED = 0x00,
    BALD = 0x01,
    BLACK = 0x02,
    BLOND = 0x03,
    BROWN = 0x04,
    GRAY = 0x05,
    WHITE = 0x06,
    AUBURN = 0x07,
    OTHER = 0xff
}

/** ISO/IEC 19794-5. Face image type */
export enum FaceType {
    // Translation from the Russian language version of the standard, as I was unable to get the English version for free
    BASIC = 0x00,
    FULLFRONTAL = 0x01,
    CONDITIONALFRONTAL = 0x02,
    BASIC3D = 0x80,
    FULL3D = 0x81,
    CONDITIONAL3D = 0x82
}

/** ISO/IEC 19794-5. Image type (format) */
export enum ISO19794ImageType {
    JPEG = 0,
    JPEG2000 = 1
}

/** ISO/IEC 39794-5. Image type (format) */
export enum ISO39794ImageType {
    jpeg = 2,
    jpeg2000Lossy = 3,
    jpeg2000Lossless = 4
}

/** ISO/IEC 19794-5. Image color space */
export enum ImageColorSpace {
    UNSPECIFIED = 0x00,
    RGB24BIT = 0x01,
    YUV422 = 0x02,
    GRAYSCALE8BIT = 0x03,
    OTHER = 0x04
}

/** ISO/IEC 19794-5. Image source type */
export enum SourceType {
    UNSPECIFIED = 0x00,
    PHOTO = 0x01,
    PHOTOBYCAM = 0x02,
    PHOTOBYSCAN = 0x03,
    FRAME = 0x04,
    /** Frame by analog camera */
    FRAMEBYACAM = 0x05,
    /** Frame by digital camera */
    FRAMEBYDCAM = 0x06,
    UNKNOWN = 0x07
}

// DG3

/** ISO/IEC 19794-4. Image compression algorithm */
export enum ISO19794FingerprintImageType {
    UNCOMPRESSED = 0x00,
    UNCOMPRESSEDPACKED = 0x01,
    WSQ = 0x02,
    JPEG = 0x03,
    JPEG2000 = 0x04,
    PNG = 0x05
}

/** ISO/IEC 39794-4. Image compression algorithm */
export enum ISO39794FingerprintImageType {
    pgm = 0,
    wsq = 1,
    jpeg2000Lossy = 2,
    jpeg2000Lossless = 3,
    png = 4
}

/** ISO/IEC 19794-4. Name of finger/part of palm */
export enum ISO19794FingerType {
    UNKNOWN = 0x00,
    RIGHTTHUMB = 0x01,
    RIGHTINDEX = 0x02,
    RIGHTMIDDLE = 0x03,
    RIGHTRING = 0x04,
    RIGHTLITTLE = 0x05,
    LEFTTHUMB = 0x06,
    LEFTINDEX = 0x07,
    LEFTMIDDLE = 0x08,
    LEFTRING = 0x09,
    LEFTLITTLE = 0x0A,
    RIGHT4FINGERS = 0x0D,
    LEFT4FINGER = 0x0E,
    BOTHTHUMB = 0x0F,

    PALM_UNKNOWN = 20,
    PALM_RIGHT_FULL = 21,
    PALM_RIGHT_WRITER_S = 22,
    PALM_LEFT_FULL = 23,
    PALM_LEFT_WRITER_S = 24,
    PALM_RIGHT_LOWER = 25,
    PALM_RIGHT_UPPER = 26,
    PALM_LEFT_LOWER = 27,
    PALM_LEFT_UPPER = 28,
    PALM_RIGHT_OTHER = 29,
    PALM_LEFT_OTHER = 30,
    PALM_RIGHT_INTERDIGITAL = 31,
    PALM_RIGHT_THENAR = 32,
    PALM_RIGHT_HYPOTHENAR = 33,
    PALM_LEFT_INTERDIGITAL = 34,
    PALM_LEFT_THENAR = 35,
    PALM_LEFT_HYPOTHENAR = 36
}

/** ISO/IEC 39794-4. Name of finger/part of palm */
export enum ISO39794FingerType {
    unknownPosition = 0,
    rightThumbFinger = 1,
    rightIndexFinger = 2,
    rightMiddleFinger = 3,
    rightRingFinger = 4,
    rightLittleFinger = 5,
    leftThumbFinger = 6,
    leftIndexFinger = 7,
    leftMiddleFinger = 8,
    leftRingFinger = 9,
    leftLittleFinger = 10,
    rightFourFingers = 13,
    leftFourFingers = 14,
    bothThumbFingers = 15,
    rightExtraDigitFinger = 16,
    leftExtraDigitFinger = 17,
    unknownFrictionRidge = 18,
    entireJointImage = 19,
    unknownPalm = 20,
    rightFullPalm = 21,
    rightWritersPalm = 22,
    rightLowerPalm = 23,
    rightUpperPalm = 24,
    rightOtherPalm = 25,
    rightInterdigital = 26,
    rightThenar = 27,
    rightHypothenar = 28,
    leftFullPalm = 29,
    leftWritersPalm = 30,
    leftLowerPalm = 31,
    leftUpperPalm = 32,
    leftOtherPalm = 33,
    leftInterdigital = 34,
    leftThenar = 35,
    leftHypothenar = 36,
    rightGrasp = 37,
    leftGrasp = 38,
    rightIndexMiddleFingers = 40,
    rightMiddleRingFingers = 41,
    rightRingLittleFingers = 42,
    leftIndexMiddleFingers = 43,
    leftMiddleRingFingers = 44,
    leftRingLittleFingers = 45,
    rightIndexLeftIndexFingers = 46,
    rightIndexMiddleRingFingers = 47,
    rightMiddleRingLittleFingers = 48,
    leftIndexMiddleRingFingers = 49,
    leftMiddleRingLittleFingers = 50,
    rightFourFingertips = 51,
    leftFourFingertips = 52,
    rightFingertips = 53,
    leftFingertips = 54,
    leftMiddleIndexRightIndexMiddleFingers = 55,
    unknownSole = 60,
    rightSole = 61,
    leftSole = 62,
    unknownToe = 63,
    rightBigToe = 64,
    rightSecondToe = 65,
    rightMiddleToe = 66,
    rightFourthToe = 67,
    rightLittleToe = 68,
    leftBigToe = 69,
    leftSecondToe = 70,
    leftMiddleToe = 71,
    leftFourthToe = 72,
    leftLittleToe = 73,
    rightFrontBallFoot = 74,
    rightBackHeelFoot = 75,
    leftFrontBallFoot = 76,
    leftBackHeelFoot = 77,
    rightMiddleFoot = 78,
    leftMiddleFoot = 79,
    rightCarpalDelta = 81,
    leftCarpalDelta = 82,
    rightFullWithWriterPalm = 83,
    leftFullWithWriterPalm = 84,
    rightBracelet = 85,
    leftBracelet = 86,
    otherPosition = 999
}

/** ISO/IEC 39794-4. Type of fingerprint and palm image */
export enum ISO39794FingerImageType {
    plainContact = 0,
    rolledContact = 1,
    latentImage = 4,
    swipeContact = 8,
    stationarySubjectContactlessPlain = 24,
    stationarySubjectContactlessRolled = 25,
    movingSubjectContactlessPlain = 41,
    movingSubjectContactlessRolled = 42,
    otherImpression = 28,
    unknownImpression = 29
}

/** ISO/IEC 19794-4. Type of fingerprint and palm image */
export enum ISO19794FingerImageType {
    LIVE = 0,
    LIVESWIPE = 1,
    NONLIVE = 2,
    NONLIVESWIPE = 2,
    FOOTPRINT = 3,
    BROACHING = 4,
    LIVECONTACTLESS = 9
}

// DG4

/** ISO/IEC 19794-4. Unit of measurement of resolution */
export enum ImageUnit {
    DPI = 1,
    DPCM = 2
}

/** ISO/IEC 19794-6. Image format */
export enum ISO19794IrisImageFormat {
    RAWMONO = 0x02,
    RAWRGB = 0x04,
    JPEGMONO = 0x06,
    JPEGRGB = 0x08,
    JPEGLSMONO = 0x0A,
    JPEGLSRGB = 0x0C,
    JPEG2000MONO = 0x0E,
    JPEG000RGB = 0x10
}

export enum ISO39794IrisImageFormat {
    pgm = 0,
    ppm = 1,
    png = 2,
    jpeg2000Lossless = 3,
    jpeg2000Lossy = 4
}

/** ISO/IEC 19794-6. Iris biometric subtype */
export enum ISO19794IrisEyeSubtype {
    UNDEFINED = 0,
    LEFT = 1,
    RIGHT = 2
}

export enum ISO39794IrisEyeSubtype {
    unknown = 0,
    rightIris = 1,
    leftIris = 2
}

export enum ISO39794IrisImageKindCode {
    uncropped = 1,
    vGA = 2,
    cropped = 3,
    croppedAndMasked = 7
}
export enum ISO39794HorizontalOrientationCode {
    undefined = 0,
    leftToRight = 1,
    rightToLeft = 2
}

export enum ISO39794VerticalOrientationCode {
    undefined = 0,
    topToBottom = 1,
    bottomToTop = 2
}

export enum ISO39794CompressionHistoryCode {
    undefined = 0,
    losslessOrNone = 1,
    lossy = 2
}