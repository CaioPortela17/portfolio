import Image from "next/image";
import { base, sobre } from "@/data/content";

/** Retrato do hero, com as cores originais. O `object-position` mantém o rosto no enquadramento. */
export function Retrato({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <Image
        src={`${base}${sobre.foto}`}
        alt="Retrato de Caio Portela"
        fill
        priority
        sizes="(min-width:1024px) 440px, 90vw"
        className="object-cover object-[34%_18%]"
      />
      {/* Véu leve embaixo, só para o selo "Disponível" ficar legível */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
      />
    </div>
  );
}
