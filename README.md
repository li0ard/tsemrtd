<p align="center">
    <a href="https://github.com/li0ard/tsemrtd/">
        <img src="https://raw.githubusercontent.com/li0ard/tsemrtd/main/.github/logo.svg" alt="tsemrtd logo" title="tsemrtd" width="120" /><br>
    </a><br>
    <b>tsemrtd</b><br>
    <b>simple library for MRTD Datagroups</b>
    <br><br>
    <img src="https://github.com/li0ard/tsemrtd/actions/workflows/test.yml/badge.svg" />
    <img src="https://jsr.io/badges/@li0ard/tsemrtd" />
    <br>
    <img src="https://img.shields.io/github/license/li0ard/tsemrtd" />
    <img src="https://img.shields.io/badge/-alpha-orange" />
    <br>
    <hr>
</p>

> [!WARNING]
> tsemrtd is currently in alpha stage: the lib is not very stable yet, and there may be a lot of bugs
> feel free to try it out, though, any feedback is appreciated!

## Installation

```bash
bunx jsr add @li0ard/tsemrtd
npx jsr add @li0ard/tsemrtd # for npm
```

## Usage

```ts
import { DG1 } from "@li0ard/tsemrtd"

let file = await Bun.file("EF_DG1.bin").bytes()
let data = DG1.load(Buffer.from(file))
console.log(data)
// P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<
// C11T002JM4D<<9608122F1310317<<<<<<<<<<<<<<<6
```

## Supported DG's

- [x] COM
- [x] DG1
- [x] DG2
- [x] DG3
- [x] DG5
- [x] DG7
- [x] DG11
- [x] DG12
- [x] DG14
- [x] DG15
- [x] SOD

Library doesn't support datagroups #6,8,9,10,13,16 because they are defined for optional information for each state.