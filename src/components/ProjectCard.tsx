import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties } from "react";
import { base, type Projeto } from "@/data/content";
import { Disco } from "./Disco";
import { IconArrow } from "./icons";

function imagemExiste(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/** Capa do single: o print do projeto, com o disco de 45 rpm escorregando para fora. */
function Capa({ projeto, prioridade }: { projeto: Projeto; prioridade?: boolean }) {
  const temImagem = imagemExiste(projeto.imagem);
  return (
    <div className="single" style={{ "--sai": projeto.destaque ? "26%" : "20%" } as CSSProperties}>
      <Disco className="single-disco" codigo="45" />
      <div className="relative z-[1] aspect-[1536/742] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_40px_70px_-40px_rgba(0,0,0,0.9)]">
        {temImagem ? (
          <Image
            src={`${base}${projeto.imagem}`}
            alt={`Captura de tela do projeto ${projeto.nome}`}
            fill
            priority={prioridade}
            sizes="(min-width:1152px) 1100px, (min-width:768px) 560px, 100vw"
            className="single-img object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center bg-gradient-to-br from-rosa to-manga"
          >
            <span className="display px-6 text-center text-2xl text-bg sm:text-4xl">
              {projeto.nome}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Links({ projeto }: { projeto: Projeto }) {
  return (
    <div className="flex flex-wrap gap-3">
      {projeto.links.map((l, i) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.rotulo} de ${projeto.nome} (abre em nova aba)`}
          className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-150 active:scale-[0.97] ${
            i === 0
              ? "bg-gradient-to-r from-a1 to-a2 text-bg hover:opacity-90"
              : "border border-line hover:border-a1 hover:text-a1"
          }`}
        >
          {l.rotulo}
          <IconArrow />
        </a>
      ))}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ projeto }: { projeto: Projeto }) {
  if (projeto.destaque) {
    return (
      <article className="projeto">
        <Capa projeto={projeto} prioridade />
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="display text-4xl sm:text-5xl">{projeto.nome}</h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-manga px-3 py-1 text-xs font-bold text-bg">
                No mercado
              </span>
            </div>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted sm:text-lg">
              {projeto.descricao}
            </p>
          </div>
          <div className="flex flex-col gap-6 md:col-span-5 md:pt-2">
            <Tags tags={projeto.tags} />
            <Links projeto={projeto} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="projeto flex h-full flex-col">
      <Capa projeto={projeto} />
      <h3 className="display mt-6 text-3xl">{projeto.nome}</h3>
      <p className="mt-3 max-w-[56ch] flex-1 leading-relaxed text-muted">{projeto.descricao}</p>
      <div className="mt-5">
        <Tags tags={projeto.tags} />
      </div>
      <div className="mt-6">
        <Links projeto={projeto} />
      </div>
    </article>
  );
}
