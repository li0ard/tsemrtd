import { AsnProp, AsnType, AsnPropTypes, AsnTypeTypes, AsnArray, AsnConvert } from "@peculiar/asn1-schema";
import { ISO39794ImageType, ISO7816Tags } from "../consts/enums.js";
import { TLV } from "@li0ard/tinytlv";
import { GenericBlock, VersionBlock } from "./common.js";

/** Image type (format)*/
@AsnType({ type: AsnTypeTypes.Choice })
class ImageDataFormat {
    /** Image type code */
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    code?: ISO39794ImageType;

    @AsnProp({ type: GenericBlock, context: 1, implicit: true })
    extensionBlock?: GenericBlock;
}

class ImageInformation2DBlock {
    @AsnProp({ type: ImageDataFormat, context: 0 })
    imageDataFormat = new ImageDataFormat();
}

class ImageRepresentation2DBlock {
    @AsnProp({ type: AsnPropTypes.OctetString, context: 0, implicit: true })
    representationData2D = new Uint8Array();

    @AsnProp({ type: ImageInformation2DBlock, context: 1, implicit: true })
    imageInformation2DBlock = new ImageInformation2DBlock();
}

@AsnType({ type: AsnTypeTypes.Choice })
class ImageRepresentationBase {
    @AsnProp({ type: ImageRepresentation2DBlock, context: 0, implicit: true })
    imageRepresentation2DBlock?: ImageRepresentation2DBlock;

    @AsnProp({ type: GenericBlock, context: 1, implicit: true })
    shapeRepresentation3DBlock?: GenericBlock;
}

@AsnType({ type: AsnTypeTypes.Choice })
class ImageRepresentation {
    @AsnProp({ type: ImageRepresentationBase, context: 0 })
    base?: ImageRepresentationBase;
    
    @AsnProp({ type: GenericBlock, context: 1, implicit: true })
    extensionBlock?: GenericBlock;
}

/** Face representation block */
class RepresentationBlock {
    /** Representation ID */
    @AsnProp({ type: AsnPropTypes.Integer, context: 0, implicit: true })
    representationId = 0;

    /** Image Representation */
    @AsnProp({ type: ImageRepresentation, context: 1 })
    imageRepresentation = new ImageRepresentation();
}

/** Face representation blocks */
@AsnType({ type: AsnTypeTypes.Sequence, itemType: RepresentationBlock })
class RepresentationBlocks extends AsnArray<RepresentationBlock> {}

/** Face image block */
class FaceImageDataBlock {
    /** Standard version block */
    @AsnProp({ type: VersionBlock, context: 0, implicit: true })
    versionBlock = new VersionBlock();

    /** Face representation blocks */
    @AsnProp({ type: RepresentationBlocks, context: 1, implicit: true })
    representationBlocks = new RepresentationBlocks();
}

/**
 * ISO/IEC 39794-5 Face image decoder
 * @experimental
 */
export class ISO39794FaceDecoder {
    /** Decode biometric data block (BDB) */
    static load(firstBlock: TLV) {
        const iso7816Blob = firstBlock.childs[0];
        if(parseInt(iso7816Blob.tag, 16) != ISO7816Tags.BIOMETRIC_HEADER_TEMPLATE_BASE) throw new Error(`Invalid object tag "0x${iso7816Blob.tag}", expected 0x${ISO7816Tags.BIOMETRIC_HEADER_TEMPLATE_BASE.toString(16)}`);
        
        const encodedFaceImage = iso7816Blob.childs[0];
        if(parseInt(encodedFaceImage.tag, 16) != 0x65) throw new Error(`Invalid ISO/IEC 39794-5 tag "0x${encodedFaceImage.tag}", expected 0x65`);

        // TODO: Fix this when APPLICATION type will be supported in "@peculiar/asn1-schema"
        const decoded = AsnConvert.parse(new TLV("30", encodedFaceImage.byteValue).toBytes(), FaceImageDataBlock);

        for(let i of decoded.representationBlocks) {
            const base = i.imageRepresentation.base;
            if(!base || !base.imageRepresentation2DBlock) continue;

            return {
                imageData: base.imageRepresentation2DBlock.representationData2D!,
                imageType: base.imageRepresentation2DBlock.imageInformation2DBlock.imageDataFormat.code!
            }
        }

        throw new Error(`No valid 2D image representation found in the FaceImageDataBlock`);
    }
}