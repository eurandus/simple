import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
          background: "#FAF8F4",
          color: "#263238",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1.5 }}>{site.name}</div>
        <div style={{ fontSize: 36, color: "#687477", marginTop: 16 }}>{site.headline}</div>
        <div style={{ width: 80, height: 4, background: "#FE938C", marginTop: 48 }} />
        <div style={{ fontSize: 28, color: "#687477", marginTop: 48 }}>germainechin.com</div>
      </div>
    ),
    size,
  );
}
