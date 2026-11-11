import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { base, type Projeto } from "@/data/content";
import { IconArrow } from "./icons";

function imagemExiste(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

export function ProjectCard({ projeto }: { projeto: Projeto }) {
  const { destaque } = projeto;
  const temImagem = imagemExiste(projeto.imagem);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_-16px_var(--glow)] ${
        destaque ? "lg:col-span-2 lg:flex-row" : ""
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          destaque ? "aspect-[16/9] lg:aspect-auto lg:w-[46%]" : "aspect-[16/9]"
        }`}
      >
        {temImagem ? (
          <Image
            src={`${base}${projeto.imagem}`}
            alt={`Captura de tela do projeto ${projeto.nome}`}
            fill
            sizes={destaque ? "(min-width:1024px) 460px, 100vw" : "(min-width:1024px) 500px, 100vw"}
            className="object-cover object-top"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#1b3a63] via-[#2a5599] to-[#7fb0ff]"
          >
            <span
              className={`px-6 text-center font-semibold tracking-tight text-white drop-shadow ${
                destaque ? "text-3xl" : "text-xl"
              }`}
            >
              {projeto.nome}
            </span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${destaque ? "p-6 sm:p-8" : "p-6"}`}>
        {destaque && (
          <span className="mb-3 inline-block w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            Projeto em destaque
          </span>
        )}
        <h3 className={`font-semibold tracking-tight ${destaque ? "text-2xl" : "text-xl"}`}>
          {projeto.nome}
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
          {projeto.descricao}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias">
          {projeto.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {projeto.links.map((l, i) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${l.rotulo} de ${projeto.nome} (abre em nova aba)`}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === 0
                  ? "bg-accent text-accent-fg hover:opacity-90"
                  : "border border-line hover:border-accent hover:text-accent"
              }`}
            >
              {l.rotulo}
              <IconArrow />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
