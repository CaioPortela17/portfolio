import Image from "next/image";
import { base, sobre } from "@/data/content";

/**
 * Retrato em duotone azul-marinho; a foto original (colorida) aparece ao passar o mouse.
 * Usado no hero. O `object-position` mantém o rosto no enquadramento.
 */
export function Retrato({ className = "" }: { className?: string }) {
  const src = `${base}${sobre.foto}`;
  const pos = "object-[34%_18%]";
  return (
    <div className={`retrato relative overflow-hidden bg-navy ${className}`}>
      <Image
        src={src}
        alt="Retrato de Caio Portela"
        fill
        priority
        sizes="(min-width:1024px) 440px, 90vw"
        className={`object-cover ${pos}`}
        style={{ filter: "url(#duotone)" }}
      />
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width:1024px) 440px, 90vw"
        className={`retrato-cor object-cover ${pos}`}
      />
      {/* Véu para integrar a foto ao azul-marinho */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/10"
      />
    </div>
  );
}
