import "dotenv/config";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";
import { prisma } from "../src/lib/prisma.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STANDARD_FONT_DIR = path.resolve(
  __dirname,
  "../node_modules/pdfjs-dist/standard_fonts"
);

const THUMB_DIR = path.resolve(__dirname, "../../frontend/public/thumbnails");
const THUMB_WIDTH = 400;
const THUMB_SCALE = 1.0;
const R2_BASE_URL = "https://pub-c9b7a41de3434a4ab7c7f137edbec13b.r2.dev/papers/real_page1_gcp";

function pathToFileURL(p: string): string {
  return "file://" + p.replace(/\\/g, "/");
}

export function cleanArxivId(id?: string | null): string | null {
  if (!id) return null;
  const match = id.match(/(?:arxiv\.org\/(?:abs|pdf)\/|arxiv:\s*|^)([a-z\-]+(?:\.[a-z\-]+)?\/\d+|\d{4}\.\d{4,5}(?:v\d+)?)/i);
  if (match && match[1]) return match[1].replace(/\.pdf$/i, "");
  return id.replace(/^arxiv:/i, "").replace(/\.pdf$/i, "");
}

/**
 * Check if a thumbnail already exists on local disk
 */
export function hasLocalThumbnail(slug: string, cleanArxiv?: string | null): boolean {
  const slugPath = path.join(THUMB_DIR, `${slug}.jpg`);
  if (fs.existsSync(slugPath)) {
    try {
      if (fs.statSync(slugPath).size > 1000) return true;
    } catch {}
  }
  if (cleanArxiv) {
    const arxivPath = path.join(THUMB_DIR, `${cleanArxiv}.jpg`);
    if (fs.existsSync(arxivPath)) {
      try {
        if (fs.statSync(arxivPath).size > 1000) return true;
      } catch {}
    }
  }
  return false;
}

/**
 * Check if a thumbnail exists in the Cloudflare R2 bucket
 */
export async function existsInR2(cleanArxiv: string): Promise<boolean> {
  const url = `${R2_BASE_URL}/${cleanArxiv}.webp`;
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(4000) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Download arXiv page 1 PDF and render thumbnail
 */
export async function generateThumbnailFromPdf(
  pdfUrl: string,
  slug: string,
  cleanArxiv?: string | null
): Promise<string | null> {
  try {
    const resp = await fetch(pdfUrl, { 
      signal: AbortSignal.timeout(30000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!resp.ok) {
      return null;
    }

    const pdfData = await resp.arrayBuffer();
    if (pdfData.byteLength < 1000) {
      return null;
    }

    const pdf = await getDocument({
      data: pdfData,
      standardFontDataUrl: pathToFileURL(STANDARD_FONT_DIR + "/"),
    }).promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: THUMB_SCALE });
    const scale = THUMB_WIDTH / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = createCanvas(scaledViewport.width, scaledViewport.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    if (!fs.existsSync(THUMB_DIR)) {
      fs.mkdirSync(THUMB_DIR, { recursive: true });
    }

    const buf = canvas.toBuffer("image/jpeg");
    const slugPath = path.join(THUMB_DIR, `${slug}.jpg`);
    fs.writeFileSync(slugPath, buf);

    if (cleanArxiv) {
      const arxivPath = path.join(THUMB_DIR, `${cleanArxiv}.jpg`);
      fs.writeFileSync(arxivPath, buf);
    }

    try { (pdf as any).destroy(); } catch {}
    return `/thumbnails/${slug}.jpg`;
  } catch (err: any) {
    return null;
  }
}

/**
 * Fetch fallback social thumbnail from HuggingFace
 */
export async function fetchHfThumbnail(
  cleanArxiv: string,
  slug: string
): Promise<string | null> {
  const hfUrl = `https://cdn-thumbnails.huggingface.co/social-thumbnails/papers/${cleanArxiv}.png`;
  try {
    const res = await fetch(hfUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength < 1000) return null;

    if (!fs.existsSync(THUMB_DIR)) {
      fs.mkdirSync(THUMB_DIR, { recursive: true });
    }

    const buf = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(THUMB_DIR, `${slug}.jpg`), buf);
    fs.writeFileSync(path.join(THUMB_DIR, `${cleanArxiv}.jpg`), buf);

    return `/thumbnails/${slug}.jpg`;
  } catch {
    return null;
  }
}

export interface GenerateOptions {
  limit?: number;
  force?: boolean;
  checkR2?: boolean;
  concurrency?: number;
}

export async function generateMissingThumbnails(options: GenerateOptions = {}) {
  const {
    limit,
    force = false,
    checkR2 = true,
    concurrency = 5
  } = options;

  if (!fs.existsSync(THUMB_DIR)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
  }

  console.log("Fetching papers from database...");
  const allPapers = await prisma.paper.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      arxivId: true,
      pdfUrl: true,
      paperUrl: true,
      thumbnailUrl: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  console.log(`Loaded ${allPapers.length} papers from database.`);

  // Filter papers that actually need thumbnails
  const candidates = [];
  let alreadyLocalCount = 0;

  for (const p of allPapers) {
    const rawArxiv = cleanArxivId(p.arxivId || p.paperUrl);
    const cleanArxiv = rawArxiv ? rawArxiv.replace(/v\d+$/i, "") : null;

    if (!force && hasLocalThumbnail(p.slug, cleanArxiv)) {
      alreadyLocalCount++;
      continue;
    }

    candidates.push({ ...p, cleanArxiv, rawArxiv });
  }

  console.log(`Already has local thumbnail: ${alreadyLocalCount}`);
  console.log(`Candidates to evaluate (missing locally): ${candidates.length}`);

  const papersToProcess = limit ? candidates.slice(0, limit) : candidates;
  console.log(`Processing ${papersToProcess.length} papers...`);

  let successCount = 0;
  let skippedR2Count = 0;
  let failedCount = 0;

  for (let i = 0; i < papersToProcess.length; i += concurrency) {
    const batch = papersToProcess.slice(i, i + concurrency);

    await Promise.all(
      batch.map(async (p) => {
        // Step 1: If checkR2 is enabled and paper has arXiv ID, check if R2 already has it
        if (checkR2 && p.cleanArxiv) {
          const inR2 = await existsInR2(p.cleanArxiv);
          if (inR2) {
            skippedR2Count++;
            return;
          }
        }

        // Step 2: Determine PDF URL
        let pdf = p.pdfUrl;
        const arxiv = p.cleanArxiv || p.rawArxiv;
        if (!pdf && arxiv) {
          pdf = `https://arxiv.org/pdf/${arxiv}.pdf`;
        }

        let thumbUrl: string | null = null;
        if (pdf) {
          thumbUrl = await generateThumbnailFromPdf(pdf, p.slug, p.cleanArxiv);
        }

        // Step 3: Fallback to HuggingFace if PDF rendering failed
        if (!thumbUrl && p.cleanArxiv) {
          thumbUrl = await fetchHfThumbnail(p.cleanArxiv, p.slug);
        }

        if (thumbUrl) {
          await prisma.paper.update({
            where: { id: p.id },
            data: { thumbnailUrl: thumbUrl }
          });
          successCount++;
          console.log(`[${successCount + failedCount}/${papersToProcess.length}] Generated for: ${p.title.slice(0, 50)}...`);
        } else {
          failedCount++;
          console.log(`[${successCount + failedCount}/${papersToProcess.length}] ❌ Failed for: ${p.title.slice(0, 50)}...`);
        }
      })
    );
  }

  console.log(`\n========================================`);
  console.log(`Thumbnail Generation Finished!`);
  console.log(`- Newly Generated: ${successCount}`);
  console.log(`- Skipped (Present in R2): ${skippedR2Count}`);
  console.log(`- Failed: ${failedCount}`);
  console.log(`========================================\n`);

  return { successCount, skippedR2Count, failedCount };
}

async function main() {
  const args = process.argv.slice(2);
  let limit: number | undefined;
  let force = false;
  let checkR2 = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--limit" && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--force") {
      force = true;
    } else if (args[i] === "--no-r2-check") {
      checkR2 = false;
    }
  }

  try {
    await generateMissingThumbnails({ limit, force, checkR2 });
  } finally {
    await prisma.$disconnect();
  }
}

if (process.argv[1] && process.argv[1].endsWith("generate-all-missing-thumbnails.ts")) {
  main().catch(console.error);
}
