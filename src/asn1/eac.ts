import { AsnProp, AsnType, AsnPropTypes, AsnTypeTypes, AsnArray } from "@peculiar/asn1-schema";
import { AlgorithmIdentifier, SubjectPublicKeyInfo } from "@peculiar/asn1-x509";

/** Class for ASN1 schema of EAC/PACE Security info sequence */
export class SecurityInfo {
    /** OID of protocol */
    @AsnProp({ type: AsnPropTypes.ObjectIdentifier })
    protocol: string = "";

    /** Required data defined by protocol */
    @AsnProp({ type: AsnPropTypes.Any })
    requiredData: any;

    /** Optional data defined by protocol */
    @AsnProp({ type: AsnPropTypes.Any, optional: true })
    optionalData?: any;
}

/** EF.CVCA file ID. Described by BSI TR-03110, section A.1.1.3 */
export class FileID {
    /** File ID */
    @AsnProp({ type: AsnPropTypes.OctetString })
    fid: ArrayBuffer = new ArrayBuffer(0)

    /** Short file ID */
    @AsnProp({ type: AsnPropTypes.OctetString, optional: true })
    sfid?: ArrayBuffer;
}

/** Information on an implementation of Terminal Authentication. Described by BSI TR-03110, section A.1.1.3 */
export class TerminalAuthenticationInfo {
    /** OID of protocol */
    @AsnProp({ type: AsnPropTypes.ObjectIdentifier })
    protocol: string = "";

    /** Terminal Authentication version */
    @AsnProp({ type: AsnPropTypes.Integer })
    version: number = 0; // MUST be 1 for TAv1 or 2 for TAv2

    /** Indicate a (short) file identifier of the file EF.CVCA (v1 only) */
    @AsnProp({ type: FileID, optional: true })
    efCVCA?: FileID;
}

/** Information on an implementation of Chip Authentication. Described by BSI TR-03110, section A.1.1.2 */
export class ChipAuthenticationInfo {
    /** OID of protocol */
    @AsnProp({ type: AsnPropTypes.ObjectIdentifier })
    protocol: string = "";

    /** Chip Authentication version */
    @AsnProp({ type: AsnPropTypes.Integer })
    version: number = 0; // MUST be 1 for CAv1 or 2 for CAv2 or 3 for CAv3

    /** Indicate the local key identifier (and domain parameters for key agreement) */
    @AsnProp({ type: AsnPropTypes.Integer, optional: true })
    keyId?: number;
}

/** A public key for Chip Authentication. Described by BSI TR-03110, section A.1.1.2 */
export class ChipAuthenticationPublicKeyInfo {
    /** OID of protocol */
    @AsnProp({ type: AsnPropTypes.ObjectIdentifier })
    protocol: string = "";

    /** Public key in encoded form ([RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480#section-2)) */
    @AsnProp({ type: SubjectPublicKeyInfo })
    chipAuthenticationPublicKey: SubjectPublicKeyInfo = new SubjectPublicKeyInfo()

    /** Indicate the local key identifier (and domain parameters for key agreement) */
    @AsnProp({ type: AsnPropTypes.Integer, optional: true })
    keyId?: number;
}

/** One set of domain parameters for Chip Authentication version 2 and version 3. Described by BSI TR-03110, section A.1.1.2 */
export class ChipAuthenticationDomainParameterInfo {
    /** OID of protocol */
    @AsnProp({ type: AsnPropTypes.ObjectIdentifier })
    protocol: string = "";

    /** Domain parameters */
    @AsnProp({ type: AlgorithmIdentifier })
    domainParameter: AlgorithmIdentifier = new AlgorithmIdentifier();

    /** Indicate the local key identifier (and domain parameters for key agreement) */
    @AsnProp({ type: AsnPropTypes.Integer, optional: true })
    keyId?: number;
}

/** Class for ASN1 schema of SecurityInfo set. Described by ICAO 9303 p.10 section 4.7.14.2 */
@AsnType({ type: AsnTypeTypes.Set, itemType: SecurityInfo })
export class SecurityInfos extends AsnArray<SecurityInfo | TerminalAuthenticationInfo | ChipAuthenticationInfo | ChipAuthenticationPublicKeyInfo | ChipAuthenticationDomainParameterInfo> {}