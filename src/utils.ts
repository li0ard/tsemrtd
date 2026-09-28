import type { TLV } from "@li0ard/tinytlv";
import type { TAGS } from "./consts/enums.js";
import { bytesToHex } from "@noble/hashes/utils.js";

export const bytesToAscii = (bytes: Uint8Array): string => new TextDecoder().decode(bytes);

export const hexToNumber = (hex: string): bigint => {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    return hex === '' ? 0n : BigInt('0x' + hex);
}
export const bytesToNumberBE = (bytes: Uint8Array): bigint => hexToNumber(bytesToHex(bytes));

export const validateDataGroupTag = (tlv: TLV, tag: TAGS): void => {
    if(parseInt(tlv.tag, 16) != tag)
        throw new Error(`Invalid data group tag "0x${tlv.tag}", expected 0x${tag.toString(16)}`);
}