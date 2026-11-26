// Copies the finished front page (entry.png) from this directory into the
// directory requested by MAKEFUN_OUTPUT_DIR, refusing oversized artwork.
// The artwork is a JPEG payload stored under the name entry.png, so we check
// the magic bytes rather than the extension.
import { createReadStream, createWriteStream, existsSync, mkdirSync, readSync, openSync, closeSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const LIMIT = 1_048_576;
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const target = join(targetDir, "entry.png");

function hasImageHeader(path: string): boolean {
  const fd = openSync(path, "r");
  try {
    const head = Buffer.alloc(4);
    readSync(fd, head, 0, 4, 0);
    const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
    const isPng = head.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    return isJpeg || isPng;
  } finally {
    closeSync(fd);
  }
}

async function main(): Promise<void> {
  if (!existsSync(source)) {
    throw new Error(`missing artwork: ${source}`);
  }
  const { size } = statSync(source);
  if (size > LIMIT) {
    throw new Error(`entry.png is ${size} bytes, over the ${LIMIT} byte cap`);
  }
  if (!hasImageHeader(source)) {
    throw new Error(`entry.png does not look like a PNG or JPEG: ${source}`);
  }
  mkdirSync(targetDir, { recursive: true });
  await pipeline(createReadStream(source), createWriteStream(target));
  console.log(`entry.png -> ${target} (${size} bytes)`);
}

await main();
