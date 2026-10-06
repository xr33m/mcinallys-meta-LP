import fs from "fs";
import path from "path";

const EXTENSIONS = ["svg", "png", "webp", "jpg", "jpeg"];

/** Server-side: returns "/logos/<key>.<ext>" if an official logo file has been added to /public/logos, else null. */
export function findLogo(key: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "logos", `${key}.${ext}`))) {
      return `/logos/${key}.${ext}`;
    }
  }
  return null;
}
