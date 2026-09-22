import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ImageResponse cannot use Next's Image component. Embed the same current
// dark-background wordmark used by the website so social cards never drift
// from the visible brand.
const logoData = await readFile(
  join(process.cwd(), "public", "logos", "kovalab-dark-bg.png"),
  "base64"
);

export const OG_LOGO_SRC = `data:image/png;base64,${logoData}`;
