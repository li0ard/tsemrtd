import { AsnProp, AsnType, AsnPropTypes, AsnTypeTypes, AsnArray, AsnConvert } from "@peculiar/asn1-schema";
import { TLV } from "@li0ard/tinytlv";
import { VersionBlock } from "./common.js";
import { type ISO39794FingerprintImageType, type ISO39794FingerType, type ISO39794FingerImageType, ISO7816Tags } from "../consts/enums.js";

class PositionExtensionBlock {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    fallback!: ISO39794FingerType;
}

@AsnType({ type: AsnTypeTypes.Choice })
class Position {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    code?: ISO39794FingerType;

    @AsnProp({ type: PositionExtensionBlock, context: 1, implicit: true })
    extensionBlock?: PositionExtensionBlock;
}

class ImpressionExtensionBlock {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    fallback!: ISO39794FingerImageType;
}

@AsnType({ type: AsnTypeTypes.Choice })
class Impression {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    code?: ISO39794FingerImageType;

    @AsnProp({ type: ImpressionExtensionBlock, context: 1, implicit: true })
    extensionBlock?: ImpressionExtensionBlock;
}

class ImageDataFormatExtensionBlock {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    fallback!: ISO39794FingerprintImageType;
}

@AsnType({ type: AsnTypeTypes.Choice })
class ImageDataFormat {
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    code?: ISO39794FingerprintImageType;

    @AsnProp({ type: ImageDataFormatExtensionBlock, context: 1, implicit: true })
    extensionBlock?: ImageDataFormatExtensionBlock;
}

/** Fingerprint representation block */
class RepresentationBlock {
    @AsnProp({ type: Position, context: 0 })
    position = new Position();

    @AsnProp({ type: Impression, context: 1 })
    impression = new Impression();

    @AsnProp({ type: ImageDataFormat, context: 2 })
    imageDataFormat = new ImageDataFormat();

    @AsnProp({ type: AsnPropTypes.OctetString, context: 3, implicit: true })
    imageData = new Uint8Array();
}

/** Fingerprint representation blocks */
@AsnType({ type: AsnTypeTypes.Sequence, itemType: RepresentationBlock })
class RepresentationBlocks extends AsnArray<RepresentationBlock> {}

/** Fingerprint image block */
class FingerImageDataBlock {
    /** Standard version block */
    @AsnProp({ type: VersionBlock, context: 0, implicit: true })
    versionBlock = new VersionBlock();

    /** Fingerprint representation blocks */
    @AsnProp({ type: RepresentationBlocks, context: 1, implicit: true })
    representationBlocks = new RepresentationBlocks();
}

/**
 * ISO/IEC 39794-4 Fingerprint image decoder
 * @experimental
 */
export class ISO39794FingerprintDecoder {
    /** Decode biometric data block (BDB) */
    static load(firstBlock: TLV) {
        const iso7816Blob = firstBlock.childs[0];
        if(parseInt(iso7816Blob.tag, 16) != ISO7816Tags.BIOMETRIC_HEADER_TEMPLATE_BASE) throw new Error(`Invalid object tag "0x${iso7816Blob.tag}", expected 0x${ISO7816Tags.BIOMETRIC_HEADER_TEMPLATE_BASE.toString(16)}`);
        
        const encodedFaceImage = iso7816Blob.childs[0];
        if(parseInt(encodedFaceImage.tag, 16) != 0x64) throw new Error(`Invalid ISO/IEC 39794-4 tag "0x${encodedFaceImage.tag}", expected 0x64`);

        // TODO: Fix this when APPLICATION type will be supported in "@peculiar/asn1-schema"
        const decoded = AsnConvert.parse(new TLV("30", encodedFaceImage.byteValue).toBytes(), FingerImageDataBlock);

        for(const i of decoded.representationBlocks) {
            if(!i.imageDataFormat.code || !i.position.code || !i.impression.code) continue;

            return {
                imageData: i.imageData,
                imageType: i.imageDataFormat.code,
                fingerType: i.position.code,
                fingerImageType: i.impression.code
            }
        }

        throw new Error(`No valid fingerprint representation found in the FingerImageDataBlock`);
    }
}