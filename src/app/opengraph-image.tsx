import { ImageResponse } from "next/og";
import { OG_LOGO_SRC } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "KovaLab, software solutions studio, Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide fallback social card. Next.js applies this to any route that
 * doesn't set its own openGraph.images and doesn't define its own
 * opengraph-image file, so most static pages and any Sanity content missing
 * a cover image land here rather than showing no preview at all.
 */
const TEXT = "KovaLab";

async function loadMontserratBold() {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Montserrat:wght@800&text=${encodeURIComponent(
    TEXT
  )}`;
  const css = await fetch(cssUrl).then((res) => res.text());
  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  if (!match) return null;
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function OpengraphImage() {
  const fontData = await loadMontserratBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C0C0C",
          position: "relative",
        }}
      >
        <img
          src={OG_LOGO_SRC}
          alt="KovaLab"
          width="600"
          height="200"
          style={{ width: 600, height: 200, objectFit: "contain" }}
        />

        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            fontWeight: 400,
            color: "#888888",
          }}
        >
          Software solutions studio, Nairobi
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Montserrat", data: fontData, weight: 800 as const }]
        : undefined,
    }
  );
}
