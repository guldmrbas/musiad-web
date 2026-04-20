import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT_DIR = new URL("../public/", import.meta.url);
const MAX_DIMENSION = 1920;
const MAX_BYTES = 100 * 1024;
const MIN_QUALITY = 35;
const QUALITY_STEPS = [82, 76, 70, 64, 58, 52, 46, 40, 35];
const SCALE_STEPS = [1, 0.9, 0.82, 0.74, 0.66, 0.58, 0.5, 0.42];
const IMAGE_PATTERN = /\.(png|jpe?g)$/i;

async function collectImages(dirUrl) {
  const entries = await fs.readdir(dirUrl, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, dirUrl);
      if (entry.isDirectory()) {
        return collectImages(entryUrl);
      }
      return IMAGE_PATTERN.test(entry.name) ? [entryUrl] : [];
    }),
  );

  return files.flat();
}

async function encodeWithinBudget(fileUrl) {
  const inputPath = fileURLToPath(fileUrl);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const baseWidth = metadata.width ?? MAX_DIMENSION;
  const baseHeight = metadata.height ?? MAX_DIMENSION;
  const largestSide = Math.max(baseWidth, baseHeight, 1);
  const boundedRatio = Math.min(1, MAX_DIMENSION / largestSide);
  const initialWidth = Math.max(1, Math.round(baseWidth * boundedRatio));
  const initialHeight = Math.max(1, Math.round(baseHeight * boundedRatio));

  let best = null;

  for (const scale of SCALE_STEPS) {
    const width = Math.max(1, Math.round(initialWidth * scale));
    const height = Math.max(1, Math.round(initialHeight * scale));

    for (const quality of QUALITY_STEPS) {
      const buffer = await encodeBuffer(inputPath, width, height, quality);

      if (!best || buffer.length < best.buffer.length) {
        best = { buffer, width, height, quality };
      }

      if (buffer.length <= MAX_BYTES) {
        return { buffer, width, height, quality };
      }
    }
  }

  if (!best) {
    throw new Error(`Unable to encode ${fileUrl.pathname}`);
  }

  if (best.buffer.length > MAX_BYTES || best.quality < MIN_QUALITY) {
    throw new Error(
      `Could not fit ${fileUrl.pathname} under ${MAX_BYTES} bytes; best=${best.buffer.length} bytes at ${best.width}x${best.height}, quality ${best.quality}`,
    );
  }

  return best;
}

async function encodeBuffer(inputPath, width, height, quality) {
  return sharp(inputPath)
    .resize({
      width,
      height,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality,
      alphaQuality: quality,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();
}

function toOutputUrl(fileUrl) {
  return new URL(path.basename(fileURLToPath(fileUrl)).replace(/\.(png|jpe?g)$/i, ".webp"), fileUrl);
}

async function main() {
  const files = await collectImages(ROOT_DIR);
  const results = [];

  for (const fileUrl of files) {
    const outputUrl = toOutputUrl(fileUrl);
    const { buffer, width, height, quality } = await encodeWithinBudget(fileUrl);
    await fs.writeFile(outputUrl, buffer);
    results.push({
      source: path.relative(process.cwd(), fileURLToPath(fileUrl)),
      output: path.relative(process.cwd(), fileURLToPath(outputUrl)),
      width,
      height,
      quality,
      bytes: buffer.length,
    });
  }

  results.sort((a, b) => a.output.localeCompare(b.output));
  for (const result of results) {
    console.log(
      `${result.output} ${result.width}x${result.height} q${result.quality} ${(result.bytes / 1024).toFixed(1)}KB`,
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
