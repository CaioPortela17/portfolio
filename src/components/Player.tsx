"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { faixas } from "@/data/content";
import { definirTurbo } from "@/lib/giro";
import { Disco } from "./Disco";
import { IconClose, IconList, IconNext, IconPrev } from "./icons";

const CODIGO_SECRETO = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type Aviso = { chave: number; titulo: string; texto: string };

const botao =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-fg transition duration-150 hover:bg-surface-2 active:scale-90 disabled:opacity-35 disabled:hover:bg-transparent";

/** Player fixo no rodapé: é o menu do site. Mostra a faixa (seção) atual e o progresso da página. */
export function Player() {
  const [ativo, setAtivo] = useState(faixas[0].id);
  const [aberto, setAberto] = useState(false);
  const [ouvidas, setOuvidas] = useState<string[]>([faixas[0].id]);
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [turbo, setTurbo] = useState(false);

  const progresso = useRef<HTMLSpanElement>(null);
  const jaOuvidas = useRef(new Set([faixas[0].id]));
  const relogio = useRef(0);

  const avisar = useCallback((titulo: string, texto: string) => {
    window.clearTimeout(relogio.current);
    setAviso({ chave: Date.now(), titulo, texto });
    relogio.current = window.setTimeout(() => setAviso(null), 3200);
  }, []);

  // Faixa atual = seção que cruza o meio da tela.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const faixa = faixas.find((f) => f.id === e.target.id);
          if (!faixa) continue;
          setAtivo(faixa.id);
          document.documentElement.dataset.lado = faixa.lado.toLowerCase();
          if (!jaOuvidas.current.has(faixa.id)) {
            jaOuvidas.current.add(faixa.id);
            setOuvidas([...jaOuvidas.current]);
            const total = jaOuvidas.current.size;
            if (total === faixas.length) avisar("Álbum completo", "Você ouviu todas as faixas");
            else avisar("Faixa desbloqueada", `${faixa.codigo} ${faixa.rotulo}, ${total} de ${faixas.length}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const f of faixas) {
      const el = document.getElementById(f.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [avisar]);

  // Barra de progresso = quanto da página já foi rolado (só transform).
  useEffect(() => {
    const medir = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progresso.current) progresso.current.style.transform = `scaleX(${p})`;
    };
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, []);

  // Esc fecha a lista; a sequência secreta liga o modo 78 rpm.
  useEffect(() => {
    let pos = 0;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === CODIGO_SECRETO[pos] ? pos + 1 : k === CODIGO_SECRETO[0] ? 1 : 0;
      if (pos === CODIGO_SECRETO.length) {
        pos = 0;
        setTurbo((v) => {
          definirTurbo(!v);
          avisar("Código secreto", !v ? "Modo 78 rpm ligado" : "De volta aos 33 rpm");
          return !v;
        });
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [avisar]);

  useEffect(() => () => window.clearTimeout(relogio.current), []);

  const indice = Math.max(
    faixas.findIndex((f) => f.id === ativo),
    0,
  );
  const atual = faixas[indice];
  const doLado = faixas.filter((f) => f.lado === atual.lado);
  const posNoLado = doLado.findIndex((f) => f.id === atual.id) + 1;

  const ir = (delta: number) => {
    const alvo = faixas[indice + delta];
    if (alvo) document.getElementById(alvo.id)?.scrollIntoView();
  };

  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-3 sm:bottom-4">
      <div className="relative mx-auto max-w-2xl">
        {aviso && (
          <div
            key={aviso.chave}
            aria-hidden
            className="conquista pointer-events-none absolute inset-x-0 bottom-full mb-3 flex justify-center"
          >
            <div className="flex items-center gap-3 rounded-xl border border-a1/60 bg-bg/95 px-4 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
              <span className="pixel grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-a1 to-a2 text-lg text-bg">
                ★
              </span>
              <span>
                <span className="pixel block text-sm text-a1">{aviso.titulo}</span>
                <span className="block text-sm text-fg">{aviso.texto}</span>
              </span>
            </div>
          </div>
        )}

        {aberto && (
          <nav
            id="lista-faixas"
            aria-label="Faixas do álbum"
            className="painel absolute inset-x-0 bottom-full mb-3 rounded-2xl border border-line bg-bg/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {(["A", "B"] as const).map((lado) => (
                <div key={lado}>
                  <p className="pixel mb-1.5 text-sm text-muted">Lado {lado}</p>
                  <ul>
                    {faixas
                      .filter((f) => f.lado === lado)
                      .map((f) => (
                        <li key={f.id}>
                          <a
                            href={`#${f.id}`}
                            onClick={() => setAberto(false)}
                            aria-current={f.id === ativo ? "true" : undefined}
                            className={`flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-surface ${
                              f.id === ativo ? "text-a1" : "text-fg"
                            }`}
                          >
                            <span className="pixel w-7 text-sm text-muted">{f.codigo}</span>
                            <span className="flex-1 font-medium">{f.rotulo}</span>
                            <span
                              aria-hidden
                              className={`h-2 w-2 rounded-full ${
                                ouvidas.includes(f.id) ? "bg-a2" : "border border-line"
                              }`}
                            />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="pixel mt-3 border-t border-line pt-3 text-sm text-muted">
              {ouvidas.length} de {faixas.length} faixas ouvidas{turbo ? ", modo 78 rpm" : ""}
            </p>
          </nav>
        )}

        <div className="relative flex items-center gap-2 overflow-hidden rounded-2xl border border-line bg-surface/85 p-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl backdrop-saturate-150 sm:gap-3">
          <span
            ref={progresso}
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-a1 to-a2"
            style={{ transform: "scaleX(0)" }}
          />

          <a href="#inicio" aria-label="Voltar para a abertura" className="shrink-0 rounded-full">
            <Disco className="h-11 w-11" />
          </a>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="pixel truncate text-xs text-muted">
              Lado {atual.lado}, faixa {posNoLado} de {doLado.length}
            </p>
            <p key={atual.id} className="troca truncate font-semibold leading-tight">
              {atual.rotulo}
            </p>
          </div>

          <span aria-hidden className="eq mr-1 hidden sm:flex">
            <i />
            <i />
            <i />
            <i />
          </span>

          <button
            type="button"
            className={botao}
            aria-label="Faixa anterior"
            disabled={indice === 0}
            onClick={() => ir(-1)}
          >
            <IconPrev />
          </button>
          <button
            type="button"
            className={`${botao} bg-gradient-to-br from-a1 to-a2 !text-bg hover:opacity-90`}
            aria-label={aberto ? "Fechar lista de faixas" : "Abrir lista de faixas"}
            aria-expanded={aberto}
            aria-controls="lista-faixas"
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconClose /> : <IconList />}
          </button>
          <button
            type="button"
            className={botao}
            aria-label="Próxima faixa"
            disabled={indice === faixas.length - 1}
            onClick={() => ir(1)}
          >
            <IconNext />
          </button>
        </div>
      </div>
    </div>
  );
}
