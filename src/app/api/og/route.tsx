import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            position: "relative",
            zIndex: 10,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Logo badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "100px",
              padding: "8px 20px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              ⊞
            </div>
            <span style={{ color: "#3B82F6", fontSize: "18px", fontWeight: 600 }}>
              Cockpit
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ededed",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Your agents.{" "}
            <span style={{ color: "#3B82F6" }}>All in one view.</span>
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: "26px",
              color: "#6b7280",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            Visual dashboard for OpenClaw — setup, monitor, and debug
            your agents. No terminal required.
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "#3B82F6",
                color: "white",
                borderRadius: "14px",
                padding: "14px 32px",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Get Cockpit — $79 One-Time →
            </div>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              color: "#6b7280",
              fontSize: "16px",
              marginTop: "4px",
            }}
          >
            <span>✅ No subscription</span>
            <span>✅ Instant access</span>
            <span>✅ 100% local</span>
            <span>✅ All future updates</span>
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            color: "#374151",
            fontSize: "16px",
            letterSpacing: "1px",
          }}
        >
          cockpit-phi.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
