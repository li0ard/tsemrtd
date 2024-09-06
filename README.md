<p align="center">
    <a href="https://github.com/li0ard/tsemrtd/">
        <img src="https://raw.githubusercontent.com/li0ard/tsemrtd/main/.github/logo.svg" alt="tsemrtd logo" title="tsemrtd" width="120" /><br>
    </a><br>
    <b>tsemrtd</b><br>
    <b>simple library for eMRTD Datagroups</b>
    <br><br>
    <a href="https://github.com/li0ard/tsemrtd/actions/workflows/test.yml"><img src="https://github.com/li0ard/tsemrtd/actions/workflows/test.yml/badge.svg" /></a>
    <a href="https://jsr.io/@li0ard/tsemrtd"><img src="https://jsr.io/badges/@li0ard/tsemrtd" /></a>
    <br>
    <a href="https://github.com/li0ard/tsemrtd/blob/main/LICENSE"><img src="https://img.shields.io/github/license/li0ard/tsemrtd" /></a>
    <img src="https://img.shields.io/badge/-alpha-orange" />
    <br>
    <hr>
</p>

> [!WARNING]
> tsemrtd is currently in alpha stage: the lib is not very stable yet, and there may be a lot of bugs
> feel free to try it out, though, any feedback is appreciated!

## Features

- Simple: Hides decoding process and provides simple and modern API
- Type-Safe: Most of the APIs are strictly typed to help your workflow
- Compliance: Fully complies with ICAO 9303 and ISO/IEC 19794 standards
- Supports Bun, Node.js, Deno, Browsers, Cloudflare Workers

## Installation

```bash
bunx jsr add @li0ard/tsemrtd
npx jsr add @li0ard/tsemrtd # for npm
```

## Usage

### Get MRZ
```ts
import { DG1 } from "@li0ard/tsemrtd"

let file = await Bun.file("EF_DG1.bin").bytes()
let data = DG1.load(Buffer.from(file))
console.log(data)
// P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<
// C11T002JM4D<<9608122F1310317<<<<<<<<<<<<<<<6
```

### Extract and save photo
```ts
import { DG2 } from "@li0ard/tsemrtd"

let file = await Bun.file("EF_DG2.bin").bytes()
let data = DG2.load(Buffer.from(file))

await Bun.write("image.jp2",data[0].imageData)
```

## Supported DG's

| Name | Descripion                                           |
|------|------------------------------------------------------|
| COM  | Manifest                                             |
| DG1  | MRZ Info                                             |
| DG2  | Face image                                           |
| DG3  | Fingerprint image (Optional)                         |
| DG4  | Iris image (Optional)                                |
| DG5  | Displayed image (Optional)                           |
| DG7  | Signature image (Optional)                           |
| DG11 | Additional personal data (Optional)                  |
| DG12 | Additional document data (Optional)                  |
| DG14 | EAC/PACE data (Conditionally mandatory)              |
| DG15 | Active authentication data (Conditionally mandatory) |
| SOD  | Security object of document                          |

Library doesn't support datagroups #6,8,9,10,13,16 because they are defined for optional information for each state.

## Acknowledgements

- [jmrtd](https://jmrtd.org) - An Open Source Java Implementation of eMRTD
- [ICAO 9303](https://www.icao.int/publications/pages/publication.aspx?docnum=9303) - Specifications to MRTD
- ISO/IEC 19794(-4/-5/-6) - Specifications to Biometric Information Encoding (BioAPI)
