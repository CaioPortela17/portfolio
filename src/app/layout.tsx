import type { Metadata, Viewport } from "next";
import { Bowlby_One, Instrument_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";

// Títulos com cara de capa de disco, texto limpo e um toque de video game nos detalhes.
const display = Bowlby_One({
  variable: "--f-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--f-body",
  subsets: ["latin"],
  display: "swap",
});

const pixel = Pixelify_Sans({
  variable: "--f-pixel",
  subsets: ["latin"],
  display: "swap",
});

const titulo = `${site.nome} | ${site.titulo}`;

export const metadata: Metadata = {
  // Só o domínio: o Next já acrescenta o basePath (/portfolio) às imagens.
  metadataBase: new URL(new URL(site.url).origin),
  title: titulo,
  description: site.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: titulo,
    description: site.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: site.descricao,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1026",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${pixel.variable} antialiased`}
    >
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.mask-in>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
