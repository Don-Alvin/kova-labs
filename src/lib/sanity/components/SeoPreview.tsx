import { useFormValue } from "sanity";
import { SITE_URL } from "@/lib/site";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 158;

const statusColor = (length: number, max: number) => {
  if (length === 0) return "#9a9a90";
  if (length > max) return "#c23b00";
  if (length > max * 0.85) return "#b8860b";
  return "#2f7a3d";
};

type SeoPreviewProps = {
  /** Route prefix the published document lives under, e.g. "/blog/". */
  basePath: string;
};

/**
 * A Google-style search result preview plus title/description character
 * counts, reading live from the document's own title/excerpt/slug fields.
 * Wired in as a fake "field" (components.input) so it needs no changes to
 * the Studio's structure config: see post.ts and project.ts.
 */
export const SeoPreview = ({ basePath }: SeoPreviewProps) => {
  const title = (useFormValue(["title"]) as string | undefined) ?? "";
  const excerpt = (useFormValue(["excerpt"]) as string | undefined) ?? "";
  const slug =
    (useFormValue(["slug", "current"]) as string | undefined) ?? "your-slug";

  const url = `${SITE_URL}${basePath}${slug}`;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 4,
        padding: 16,
        fontFamily: "arial, sans-serif",
        background: "#fff",
      }}
    >
      <p style={{ margin: 0, fontSize: 14, color: "#202124" }}>KovaLab</p>
      <p style={{ margin: "2px 0 4px", fontSize: 14, color: "#4d5156" }}>
        {url}
      </p>
      <p style={{ margin: 0, fontSize: 20, color: "#1a0dab", lineHeight: 1.3 }}>
        {title || "Untitled"}
      </p>
      <p
        style={{
          margin: "3px 0 0",
          fontSize: 14,
          color: "#4d5156",
          lineHeight: 1.4,
        }}
      >
        {excerpt || "No description yet."}
      </p>

      <div style={{ marginTop: 16, display: "flex", gap: 24, fontSize: 12 }}>
        <span style={{ color: statusColor(title.length, TITLE_MAX) }}>
          Title: {title.length} / {TITLE_MAX}
        </span>
        <span style={{ color: statusColor(excerpt.length, DESCRIPTION_MAX) }}>
          Description: {excerpt.length} / {DESCRIPTION_MAX}
        </span>
      </div>
    </div>
  );
};
