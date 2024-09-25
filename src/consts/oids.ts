/** BSI TR-03110. Terminal authentication */
export const TerminalAuthentication = "0.4.0.127.0.7.2.2.2"

/** BSI TR-03110. Chip authentication */
export enum ChipAuthDomainParameters {
    CA_DH = "0.4.0.127.0.7.2.2.3.1",
    CA_ECDH = "0.4.0.127.0.7.2.2.3.2"
}

/** BSI TR-03110. Chip authentication */
export enum ChipAuthPublicKey {
    PK_DH = "0.4.0.127.0.7.2.2.1.1",
    PK_ECDH = "0.4.0.127.0.7.2.2.1.2",
}

/** BSI TR-03110. Chip authentication */
export enum ChipAuthInfo {
    CA_DH_3DES_CBC_CBC = "0.4.0.127.0.7.2.2.3.1.1",
    CA_DH_AES_CBC_CMAC_128 = "0.4.0.127.0.7.2.2.3.1.2",
    CA_DH_AES_CBC_CMAC_192 = "0.4.0.127.0.7.2.2.3.1.3",
    CA_DH_AES_CBC_CMAC_256 = "0.4.0.127.0.7.2.2.3.1.4",
    CA_ECDH_3DES_CBC_CBC = "0.4.0.127.0.7.2.2.3.2.1",
    CA_ECDH_AES_CBC_CMAC_128 = "0.4.0.127.0.7.2.2.3.2.2",
    CA_ECDH_AES_CBC_CMAC_192 = "0.4.0.127.0.7.2.2.3.2.3",
    CA_ECDH_AES_CBC_CMAC_256 = "0.4.0.127.0.7.2.2.3.2.4",
}