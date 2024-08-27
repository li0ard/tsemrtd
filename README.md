<p align="center">
    <a href="https://github.com/li0ard/tsemrtd/">
        <img src="https://raw.githubusercontent.com/li0ard/tsemrtd/main/.github/logo.svg" alt="tsemrtd logo" title="tsemrtd" width="480" /><br/>
    </a><br/>
    <b>simple library for MRTD Datagroups</b>
    <br>
</p>

> [!WARNING]
> tsemrtd is currently in alpha stage: the lib is not very stable yet, and there may be a lot of bugs
> feel free to try it out, though, any feedback is appreciated!

## Installation

`Soon`

## Usage

```ts
import { DG1 } from "tsemrtd"

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
- [ ] DG11
- [ ] DG12
- [ ] DG16