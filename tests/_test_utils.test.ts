import { join } from "path";

export const getDGContent = async (name: string): Promise<Uint8Array> =>
    await Bun.file(join(import.meta.dir, "dgs", name)).bytes();
