import { AsnProp, AsnType, AsnPropTypes, AsnTypeTypes, AsnArray, AsnConvert } from "@peculiar/asn1-schema";
import { TLV } from "@li0ard/tinytlv";
import { GenericBlock, VersionBlock, DateTimeBlock as CaptureDateTimeBlock } from "./common.js";
import { ISO7816Tags, type ISO39794CompressionHistoryCode, type ISO39794HorizontalOrientationCode, type ISO39794IrisEyeSubtype, type ISO39794IrisImageFormat, type ISO39794IrisImageKindCode, type ISO39794VerticalOrientationCode } from "../consts/enums.js";

class IrisImageKindExtensionBlock {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    fallback!: ISO39794IrisImageKindCode;
}

@AsnType({ type: AsnTypeTypes.Choice })
class IrisImageKind {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    code?: ISO39794IrisImageKindCode;

    @AsnProp({ type: IrisImageKindExtensionBlock, context: 1, implicit: true })
    extensionBlock?: IrisImageKindExtensionBlock;
}

@AsnType({ type: AsnTypeTypes.Choice })
class ImageDataFormat {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    code?: ISO39794IrisImageFormat;

    @AsnProp({ type: GenericBlock, context: 1, implicit: true })
    extensionBlock?: GenericBlock;
}

/** Iris representation block */
class RepresentationBlock {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    eyeLabelCode!: ISO39794IrisEyeSubtype;

    @AsnProp({ type: IrisImageKind, context: 1 })
    irisImageKind = new IrisImageKind();

    @AsnProp({ type: AsnPropTypes.Integer, context: 2, implicit: true })
    bitDepth!: number;

    @AsnProp({ type: ImageDataFormat, context: 3 })
    imageDataFormat = new ImageDataFormat();

    @AsnProp({ type: AsnPropTypes.Integer, context: 4, implicit: true })
    horizontalOrientationCode!: ISO39794HorizontalOrientationCode;

    @AsnProp({ type: AsnPropTypes.Integer, context: 5, implicit: true })
    verticalOrientationCode!: ISO39794VerticalOrientationCode;

    @AsnProp({ type: AsnPropTypes.Integer, context: 6, implicit: true })
    compressionHistoryCode!: ISO39794CompressionHistoryCode;

    @AsnProp({ type: CaptureDateTimeBlock, context: 7, implicit: true })
    captureDateTimeBlock = new CaptureDateTimeBlock();

    @AsnProp({ type: AsnPropTypes.OctetString, context: 8, implicit: true })
    irisImageData = new Uint8Array();
}

/** Iris representation blocks */
@AsnType({ type: AsnTypeTypes.Sequence, itemType: RepresentationBlock })
class RepresentationBlocks extends AsnArray<RepresentationBlock> {}

/** Iris image block */
class IrisImageDataBlock {
    /** Standard version block */
    @AsnProp({ type: VersionBlock, context: 0, implicit: true })
    versionBlock = new VersionBlock();

    /** Iris representation blocks */
    @AsnProp({ type: RepresentationBlocks, context: 1, implicit: true })
    representationBlocks = new RepresentationBlocks();
}

/**
 * ISO/IEC 39794-6 Iris image decoder
 * @experimental
 */
export class ISO39794IrisDecoder {
    /** Decode biometric data block (BDB) */
    static load(firstBlock: TLV) {
        const iso7816Blob = firstBlock.childs[0];
        if(parseInt(iso7816Blob.tag, 16) != ISO7816Tags.BIOMETRIC_HEADER_TEMPLATE_BASE) throw new Error(`Invalid object tag "0x${iso7816Blob.tag}", expected 0x${ISO7816Tags.BIOMETRIC_HEADER_TEMPLATE_BASE.toString(16)}`);
        
        const encodedFaceImage = iso7816Blob.childs[0];
        if(parseInt(encodedFaceImage.tag, 16) != 0x66) throw new Error(`Invalid ISO/IEC 39794-6 tag "0x${encodedFaceImage.tag}", expected 0x66`);

        // TODO: Fix this when APPLICATION type will be supported in "@peculiar/asn1-schema"
        const decoded = AsnConvert.parse(new TLV("30", encodedFaceImage.byteValue).toBytes(), IrisImageDataBlock);

        for(let i of decoded.representationBlocks) {
            if(!i.imageDataFormat.code) continue;

            return {
                biometricSubtype: i.eyeLabelCode,
                imageData: i.irisImageData,
                imageType: i.imageDataFormat.code,
                depth: i.bitDepth
            }
        }

        throw new Error(`No valid iris image representation found in the IrisImageDataBlock`);
    }
}