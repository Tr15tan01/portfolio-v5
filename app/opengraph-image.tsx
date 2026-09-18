import { ImageResponse } from "next/og";
import { portfolio } from "@/lib/portfolio";

// The preview card shown when your link is shared on LinkedIn, Facebook, Telegram, WhatsApp, etc.
export const alt = portfolio.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const { site } = portfolio;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b0514 0%, #2e1065 55%, #831843 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, opacity: 0.9 }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#22c55e" }} />
          <span>{site.availability.available ? site.availability.text : site.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 44, marginTop: 20, color: "#d8b4fe" }}>{site.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.8 }}>
          {`Websites · Web apps · E-commerce · ${site.location}`}
        </div>
      </div>
    ),
    size
  );
}
