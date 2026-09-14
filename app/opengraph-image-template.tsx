import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

let cachedPhotoDataUri: string | null = null;

function getPhotoDataUri() {
  if (!cachedPhotoDataUri) {
    const bytes = readFileSync(join(process.cwd(), "public/images/isaac_icon.png"));
    cachedPhotoDataUri = `data:image/png;base64,${bytes.toString("base64")}`;
  }
  return cachedPhotoDataUri;
}

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(34,211,238,0.25), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
          <img
            src={getPhotoDataUri()}
            width={110}
            height={110}
            style={{ borderRadius: "50%", border: "4px solid rgba(255,255,255,0.85)" }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 28 }}>
            <span
              style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#a5b4fc",
              }}
            >
              {eyebrow}
            </span>
            <span style={{ fontSize: 34, fontWeight: 700, color: "#f8fafc" }}>
              Isaac Velez
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 32, color: "#cbd5e1", marginTop: 20, maxWidth: 900 }}>
          {subtitle}
        </span>
      </div>
    ),
    { ...ogImageSize }
  );
}
