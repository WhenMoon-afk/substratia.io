import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Free AI Tools";
  const subtitle = searchParams.get("subtitle") || "by Substratia";
  // Badge customization: 'none' hides it, custom text uses that text, default shows free/no signup
  const badge = searchParams.get("badge");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a14",
        backgroundImage:
          "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)",
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <span
              style={{ fontSize: "32px", color: "white", fontWeight: "bold" }}
            >
              S
            </span>
          </div>
          <span style={{ fontSize: "28px", color: "#9CA3AF", fontWeight: 500 }}>
            substratia.io
          </span>
        </div>

        {/* Tool title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#9CA3AF",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>

        {/* Badge - customizable via 'badge' param: 'none' to hide, or custom text */}
        {badge !== "none" && (
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              padding: "12px 24px",
              borderRadius: "9999px",
              background: "rgba(34, 211, 238, 0.1)",
              border: "1px solid rgba(34, 211, 238, 0.3)",
            }}
          >
            <span style={{ fontSize: "18px", color: "#22D3EE" }}>
              {badge || "Free • No Signup Required"}
            </span>
          </div>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
