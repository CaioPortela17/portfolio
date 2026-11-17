"use client";

import { useEffect, useRef } from "react";
import { registrarGiro } from "@/lib/giro";

/** Disco de vinil decorativo. O tamanho e a posição vêm do `className`. */
export function Disco({ className = "", codigo }: { className?: string; codigo?: string }) {
  const rotulo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rotulo.current) return;
    return registrarGiro(rotulo.current);
  }, []);

  return (
    <div aria-hidden className={`disco ${className}`}>
      <div ref={rotulo} className="disco-rotulo" style={{ containerType: "inline-size" }}>
        {codigo && <span>{codigo}</span>}
        <i />
      </div>
    </div>
  );
}
