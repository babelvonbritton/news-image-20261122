// News-image entry (Node 22, standard library only).
//
// The image beside this file is the entry: a front page summing up the
// world's news of Sunday 22 November 2026. Copy it to the output directory
// the grader provides, falling back to /output. Outside the grader's
// container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(join(here, 'entry.png'));

// Fail loudly rather than hand the gate a broken file: a PNG starts with
// these eight bytes, and anything else means the entry image is corrupt.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (image.length < PNG_SIGNATURE.length || !image.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error('entry.png is not a valid PNG');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
