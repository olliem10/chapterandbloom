import { ImageResponse } from "next/og";

export const alt = "Chapter & Bloom — Made for Those Who Live Between the Pages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#FBF7F3",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 390,
            width: 420,
            height: 420,
            borderRadius: 9999,
            backgroundColor: "rgba(248,215,230,0.55)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: 84, color: "#1A1A1A", fontWeight: 600 }}>
          Chapter
          <span style={{ color: "#F3C5D8", margin: "0 20px" }}>&amp;</span>
          Bloom
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#4A4542" }}>
          Made for Those Who Live Between the Pages.
        </div>
      </div>
    ),
    { ...size },
  );
}
