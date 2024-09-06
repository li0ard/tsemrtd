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
export enum ImageType {
    JPEG = 0,
    JPEG2000 = 1
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

/** ISO/IEC 19794-4. Image compression algorithm */
export enum FingerprintImageType {
    UNCOMPRESSED = 0x00,
    UNCOMPRESSEDPACKED = 0x01,
    WSQ = 0x02,
    JPEG = 0x03,
    JPEG2000 = 0x04,
    PNG = 0x05
}

/** ISO/IEC 19794-4. Name of finger/part of palm */
export enum FingerType {
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

/** ISO/IEC 19794-4. Type of fingerprint and palm image */
export enum FingerImageType {
    LIVE = 0x00,
    LIVESWIPE = 0x01,
    NONLIVE = 0x02,
    NONLIVESWIPE = 0x02,
    FOOTPRINT = 0x03,
    BROACHING = 0x04,
    LIVECONTACTLESS = 0x09
}

/** ISO/IEC 19794-4. Unit of measurement of resolution */
export enum ImageUnit {
    DPI = 0x01,
    DPCM = 0x02
}

/** ISO/IEC 19794-6. Image format */
export enum IrisImageFormat {
    RAWMONO = 0x02,
    RAWRGB = 0x04,
    JPEGMONO = 0x06,
    JPEGRGB = 0x08,
    JPEGLSMONO = 0x0A,
    JPEGLSRGB = 0x0C,
    JPEG2000MONO = 0x0E,
    JPEG000RGB = 0x10
}

/** ISO/IEC 19794-6. Iris biometric subtype */
export enum IrisEyeSubtype {
    UNDEFINED = 0x00,
    LEFT = 0x01,
    RIGHT = 0x02
}