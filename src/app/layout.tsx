import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const titulo = `${site.nome} | ${site.titulo}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1220" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

// Define o tema antes da pintura para evitar "flash". Padrão: escuro.
const temaInicial = `try{var t=localStorage.getItem("tema");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
