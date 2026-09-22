import { ImageResponse } from "next/og";
import { sanityFetch } from "@/lib/sanity/client";
import { POST_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";
import { launchPost } from "@/lib/launchPost";

export const alt = "KovaLab | Practical notes for business owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, null)
    ?? (slug === launchPost.slug ? launchPost : null);
  const text = `KovaLab / Notes from the studio ${post?.title ?? "Practical notes for your business"} Kisumu, Kenya / kovalab.co.ke`;
  const css = await fetch(`https://fonts.googleapis.com/css2?family=Montserrat:wght@700&text=${encodeURIComponent(text)}`).then(response => response.text());
  const fontUrl = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/)?.[1];
  const font = fontUrl ? await fetch(fontUrl).then(response => response.arrayBuffer()) : null;
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#171717", color: "#faf7f2", padding: 72, fontFamily: "Montserrat" }}>
      <div style={{ display: "flex", color: "#ff4d00", fontSize: 32 }}>KovaLab / Notes from the studio</div>
      <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{post?.title ?? "Practical notes for your business"}</div>
      <div style={{ display: "flex", fontSize: 28 }}>Kisumu, Kenya / kovalab.co.ke</div>
    </div>, { ...size, ...(font ? { fonts: [{ name: "Montserrat", data: font, weight: 700 as const }] } : {}) },
  );
}
