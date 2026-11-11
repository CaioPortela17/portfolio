"use client";

import { IconMoon, IconSun } from "./icons";

export function ThemeToggle() {
  function alternar() {
    const root = document.documentElement;
    const proximo = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = proximo;
    try {
      localStorage.setItem("tema", proximo);
    } catch {}
  }

  // Ambos os ícones ficam no HTML; o CSS escolhe qual mostrar (sem erro de hidratação).
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Alternar entre tema claro e escuro"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-fg transition duration-150 hover:border-accent hover:text-accent active:scale-95"
    >
      <IconSun className="hidden dark:block" />
      <IconMoon className="block dark:hidden" />
    </button>
  );
}
