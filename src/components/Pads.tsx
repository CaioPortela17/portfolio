"use client";

import { useRef, useState, type CSSProperties } from "react";
import { IconSound, IconSoundOff } from "./icons";

type Grupo = { grupo: string; cor: string; itens: string[] };

// Escala pentatônica maior: qualquer sequência de pads soa bem.
const SEMITONS = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31, 33, 36];

/** Tecnologias como pads de sampler: cada uma acende e toca uma nota ao clicar. */
export function Pads({ grupos }: { grupos: Grupo[] }) {
  const [som, setSom] = useState(true);
  const audio = useRef<AudioContext | null>(null);

  const pads = grupos.flatMap((g) => g.itens.map((nome) => ({ nome, cor: g.cor, grupo: g.grupo })));

  function tocar(i: number, el: HTMLElement) {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.querySelector(".pad-luz")?.animate([{ opacity: 0.75 }, { opacity: 0 }], {
      duration: semMovimento ? 0 : 520,
      easing: "ease-out",
    });
    if (!som) return;
    try {
      const ctx = (audio.current ??= new AudioContext());
      if (ctx.state === "suspended") void ctx.resume();
      const t = ctx.currentTime;
      const freq = 220 * 2 ** (SEMITONS[i % SEMITONS.length] / 12);
      const ganho = ctx.createGain();
      ganho.gain.setValueAtTime(0.0001, t);
      ganho.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      ganho.connect(ctx.destination);
      for (const [tipo, mult] of [
        ["triangle", 1],
        ["sine", 2],
      ] as const) {
        const osc = ctx.createOscillator();
        osc.type = tipo;
        osc.frequency.value = freq * mult;
        osc.connect(ganho);
        osc.start(t);
        osc.stop(t + 0.95);
      }
    } catch {
      // Navegador sem Web Audio: o pad só acende.
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {grupos.map((g) => (
            <li key={g.grupo} className="flex items-center gap-2">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: g.cor }} />
              {g.grupo}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setSom((v) => !v)}
          aria-pressed={som}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition duration-150 hover:border-a1 hover:text-a1 active:scale-95"
        >
          {som ? <IconSound /> : <IconSoundOff />}
          {som ? "Som ligado" : "Som desligado"}
        </button>
      </div>

      <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-4">
        {pads.map((p, i) => (
          <li key={p.nome}>
            <button
              type="button"
              className="pad w-full px-1 text-sm sm:text-base"
              style={{ "--c": p.cor } as CSSProperties}
              aria-label={`${p.nome}, ${p.grupo}`}
              onClick={(e) => tocar(i, e.currentTarget)}
            >
              <span aria-hidden className="pad-luz" />
              <span className="relative">{p.nome}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-muted">Toque nos pads: cada tecnologia tem uma nota.</p>
    </div>
  );
}
