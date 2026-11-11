"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { base, nav, site, sobre } from "@/data/content";
import { ThemeToggle } from "./ThemeToggle";
import { IconClose, IconMenu } from "./icons";

export function Header() {
  const [ativo, setAtivo] = useState("inicio");
  const [aberto, setAberto] = useState(false);
  const [barra, setBarra] = useState<{ x: number; w: number } | null>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const secoes = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Posição da barrinha sob o link ativo (apenas transform → animação barata).
  useLayoutEffect(() => {
    const medir = () => {
      const a = listaRef.current?.querySelector<HTMLElement>(`[data-id="${ativo}"]`);
      setBarra(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [ativo]);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-line bg-bg/75 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex h-14 items-center justify-between gap-3 pl-2 pr-2 sm:pl-3">
          <a
            href="#inicio"
            className="group flex items-center gap-3 rounded-full py-1 pr-3 font-semibold tracking-tight"
            aria-label={`${site.nome} — ir para o início`}
          >
            <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-line transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-active:scale-95">
              <Image
                src={`${base}${sobre.foto}`}
                alt=""
                width={96}
                height={96}
                className="h-full w-full object-cover object-[34%_18%] scale-[1.6] origin-[34%_22%]"
                style={{ filter: "url(#duotone)" }}
              />
            </span>
            <span>{site.nome}</span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul ref={listaRef} className="relative flex items-center">
              {nav.slice(1).map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    data-id={n.id}
                    aria-current={ativo === n.id ? "true" : undefined}
                    className={`block px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      ativo === n.id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {n.rotulo}
                  </a>
                </li>
              ))}
              {barra && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 origin-left rounded-full bg-accent transition-transform duration-500 [transition-timing-function:var(--ease-out)]"
                  style={{
                    width: 1,
                    transform: `translateX(${barra.x + 14}px) scaleX(${Math.max(barra.w - 28, 1)})`,
                  }}
                />
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface transition-transform duration-150 active:scale-95 lg:hidden"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              onClick={() => setAberto((v) => !v)}
            >
              {aberto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {aberto && (
          <nav
            id="menu-mobile"
            aria-label="Menu móvel"
            className="border-t border-line px-4 pb-3 pt-1 transition duration-200 [transition-timing-function:var(--ease-out)] starting:-translate-y-1 starting:opacity-0 lg:hidden"
          >
            <ul className="flex flex-col">
              {nav.slice(1).map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setAberto(false)}
                    className={`block py-3 text-base font-medium ${
                      ativo === n.id ? "text-accent" : "text-fg"
                    }`}
                  >
                    {n.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
