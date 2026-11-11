import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Caio Portela | Desenvolvedor Web";
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
          padding: 80,
          background: "linear-gradient(135deg, #0a1220 0%, #1b3a63 100%)",
          color: "#e8eef9",
        }}
      >
        <div style={{ fontSize: 30, color: "#7fb0ff", fontWeight: 600 }}>
          Desenvolvedor Web · Estudante de Ciência da Computação
        </div>
        <div style={{ fontSize: 110, fontWeight: 800, marginTop: 16 }}>Caio Portela</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#9fb0cc", maxWidth: 900 }}>
          Construo produtos web reais, do levantamento de requisitos à entrega.
        </div>
      </div>
    ),
    size,
  );
}
