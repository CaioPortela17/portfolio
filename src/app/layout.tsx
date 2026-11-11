import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";

const display = Bricolage_Grotesque({
  variable: "--f-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--f-body",
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08111f" },
    { media: "(prefers-color-scheme: light)", color: "#f3f6fb" },
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
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.mask-in>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
