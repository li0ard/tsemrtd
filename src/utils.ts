// Code from @noble/hashes/utils.ts

import type { TLV } from "@li0ard/tinytlv";
import type { TAGS } from "./consts/enums.js";

const hexes = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 } as const;
const asciiToBase16 = (ch: number): number | undefined => {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}

/**
 * Convert byte array to hex string.
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
export const bytesToHex = (bytes: Uint8Array): string => {
    let hex = '';
    for (let i = 0; i < bytes.length; i++) hex += hexes[bytes[i]];
    return hex;
}
/**
 * Convert hex string to byte array.
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
export const hexToBytes = (hex: string): Uint8Array => {
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('hex string expected, got unpadded hex of length ' + hl);

    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}

/**
 * Convert byte array to ASCII string.
 */
export const bytesToAscii = (bytes: Uint8Array): string => {
    let string = '';
    for(const i of bytes) string += String.fromCharCode(i);
    return string;
}

export const hexToNumber = (hex: string): bigint => {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    return hex === '' ? 0n : BigInt('0x' + hex);
}
export const bytesToNumberBE = (bytes: Uint8Array): bigint => hexToNumber(bytesToHex(bytes));

export const validateDataGroupTag = (tlv: TLV, tag: TAGS) => {
    if(parseInt(tlv.tag, 16) != tag) throw new Error(`Invalid data group tag "0x${tlv.tag}", expected 0x${tag.toString(16)}`);
}