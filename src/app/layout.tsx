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
        {/* Filtro duotone (sombras azul-marinho → luzes azul-céu) usado no retrato */}
        <svg width="0" height="0" aria-hidden className="absolute">
          <filter id="duotone" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.03 0.78" />
              <feFuncG type="table" tableValues="0.08 0.88" />
              <feFuncB type="table" tableValues="0.18 1" />
            </feComponentTransfer>
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
