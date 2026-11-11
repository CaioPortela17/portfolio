"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/data/content";
import { ThemeToggle } from "./ThemeToggle";
import { IconClose, IconMenu } from "./icons";

export function Header() {
  const [ativo, setAtivo] = useState("inicio");
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  const linkClasse = (id: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
      ativo === id ? "text-accent" : "text-muted hover:text-fg"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        rolou || aberto
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a
          href="#inicio"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label={`${site.nome} — ir para o início`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-strong text-xs font-bold text-white dark:text-[#7fb0ff]">
            CP
          </span>
          <span className="hidden sm:inline">{site.nome}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.slice(1).map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={linkClasse(n.id)}
              aria-current={ativo === n.id ? "true" : undefined}
            >
              {n.rotulo}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface lg:hidden"
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
          className="border-t border-line bg-bg px-5 pb-4 pt-2 lg:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col">
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
    </header>
  );
}
