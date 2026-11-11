"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

function useVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Faz o conteúdo aparecer suavemente ao entrar na tela. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useVisible<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Título que sobe de dentro de uma máscara ao entrar na tela. */
export function MaskTitle({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useVisible<HTMLHeadingElement>();
  return (
    <h2 ref={ref} id={id} className={`line-mask mask-in ${className}`}>
      <span>{children}</span>
    </h2>
  );
}
