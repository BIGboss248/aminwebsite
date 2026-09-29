import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Amin Jamali | Full-Stack Engineer & Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #050505 0%, #111115 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          color: "#FAFAFA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#06B6D4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#050505",
              fontWeight: 900,
              fontSize: "24px",
            }}
          >
            AJ
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#06B6D4",
                fontFamily: "monospace",
              }}
            >
              SYSTEMS OBSERVATORY // PORTFOLIO
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
              color: "#FAFAFA",
            }}
          >
            {SITE_CONFIG.author.name}
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#A1A1AA",
              margin: 0,
              fontWeight: 500,
              maxWidth: "800px",
            }}
          >
            {SITE_CONFIG.author.role}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #27272A",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ fontSize: "16px", color: "#71717A", fontFamily: "monospace" }}>
              Next.js 16
            </span>
            <span style={{ fontSize: "16px", color: "#71717A", fontFamily: "monospace" }}>
              TypeScript
            </span>
            <span style={{ fontSize: "16px", color: "#71717A", fontFamily: "monospace" }}>
              Systems Architecture
            </span>
            <span style={{ fontSize: "16px", color: "#71717A", fontFamily: "monospace" }}>
              Machine Learning Research
            </span>
          </div>
          <span style={{ fontSize: "16px", color: "#06B6D4", fontFamily: "monospace" }}>
            meetjamali.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
