import { ImageResponse } from "next/og";

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
        {/* The wordmark blown up as texture, the same motif the real hero
            uses, so a shared link still feels like this site before anyone
            has clicked through. */}
        <div
          style={{
            position: "absolute",
            fontSize: 420,
            fontWeight: 800,
            color: "#FAFAF7",
            opacity: 0.05,
            letterSpacing: -8,
          }}
        >
          kova
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 22, height: 96, background: "#FF4D00" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ width: 22, height: 44, background: "#FAFAF7" }} />
              <div style={{ width: 22, height: 44, background: "#FAFAF7" }} />
            </div>
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#FAFAF7",
              letterSpacing: -2,
            }}
          >
            kovalab
          </div>
        </div>

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
