import type { CSSProperties, ReactNode } from "react";
import { Header } from "@/components/Header";
import { MaskTitle, Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { Retrato } from "@/components/Retrato";
import { IconDownload, IconGithub, IconLinkedin, IconMail } from "@/components/icons";
import {
  contato,
  experiencia,
  formacao,
  hero,
  links,
  projetos,
  sobre,
  tecnologias,
} from "@/data/content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const botao =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition duration-150 active:scale-[0.97]";

function Secao({
  id,
  titulo,
  children,
  className = "",
}: {
  id: string;
  titulo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className={`mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 ${className}`}
    >
      <MaskTitle id={`${id}-t`} className="display mb-12 text-5xl sm:mb-16 sm:text-7xl">
        {titulo}
      </MaskTitle>
      {children}
    </section>
  );
}

/** Linha editorial: período à esquerda, conteúdo à direita, separada por fio. */
function Linha({
  periodo,
  children,
  delay = 0,
}: {
  periodo: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8">
        <p className="text-sm font-semibold text-accent md:col-span-3 md:pt-1.5">{periodo}</p>
        <div className="md:col-span-9">{children}</div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Pular para o conteúdo
      </a>
      <Header />

      <main id="conteudo">
        {/* ───────── Início ───────── */}
        <section
          id="inicio"
          aria-labelledby="inicio-t"
          className="relative flex min-h-svh items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8"
        >

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 id="inicio-t" className="display text-[clamp(3.5rem,10vw,6rem)]">
                <span className="line-mask">
                  <span style={d(0)}>Caio</span>
                </span>
                <span className="line-mask">
                  <span style={d(90)}>Portela</span>
                </span>
              </h1>

              <p className="rise mt-7 text-xl font-semibold text-accent sm:text-2xl" style={d(450)}>
                {hero.subtitulo}
              </p>
              <p
                className="rise mt-5 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl"
                style={d(560)}
              >
                {hero.frase}
              </p>

              <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={d(680)}>
                <a
                  href="#projetos"
                  className={`${botao} bg-accent text-accent-fg hover:opacity-90`}
                >
                  {hero.botaoProjetos}
                </a>
                <a
                  href={links.curriculo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${botao} border border-line bg-surface hover:border-accent hover:text-accent`}
                >
                  <IconDownload />
                  {hero.botaoCurriculo}
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
              {/* Moldura deslocada em azul: dá profundidade sem sombra pesada */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-sky/50 sm:translate-x-4 sm:translate-y-4"
              />
              <Retrato className="unveil relative aspect-[4/5] rounded-[2rem]" />
              <p
                className="rise absolute bottom-4 left-4 right-4 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-[#08111f]/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-md sm:bottom-5 sm:left-5"
                style={d(900)}
              >
                <span aria-hidden className="dot-live h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
                {hero.selo}
              </p>
            </div>
          </div>
        </section>

        {/* ───────── Sobre ───────── */}
        <Secao id="sobre" titulo={sobre.titulo}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-8">
              <p className="max-w-[60ch] text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">
                {sobre.texto}
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-4">
              <dl className="divide-y divide-line border-y border-line">
                {sobre.fatos.map((f) => (
                  <div key={f.rotulo} className="py-4">
                    <dt className="text-sm text-muted">{f.rotulo}</dt>
                    <dd className="mt-1 font-semibold">{f.valor}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Secao>

        {/* ───────── Projetos ───────── */}
        <Secao id="projetos" titulo="Projetos">
          <div className="space-y-20 sm:space-y-28">
            {projetos
              .filter((p) => p.destaque)
              .map((p) => (
                <Reveal key={p.nome}>
                  <ProjectCard projeto={p} />
                </Reveal>
              ))}
            <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-14">
              {projetos
                .filter((p) => !p.destaque)
                .map((p, i) => (
                  <Reveal key={p.nome} delay={i * 100}>
                    <ProjectCard projeto={p} />
                  </Reveal>
                ))}
            </div>
          </div>
        </Secao>

        {/* ───────── Experiência ───────── */}
        <Secao id="experiencia" titulo="Experiência">
          <div className="border-b border-line">
            {experiencia.map((e) => (
              <Linha key={e.cargo} periodo={e.periodo}>
                <h3 className="display text-3xl sm:text-4xl">{e.cargo}</h3>
                <ul className="mt-6 max-w-[62ch] space-y-3.5 text-lg text-muted">
                  {e.pontos.map((p) => (
                    <li key={p} className="flex gap-4 leading-relaxed">
                      <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Linha>
            ))}
          </div>
        </Secao>

        {/* ───────── Formação ───────── */}
        <Secao id="formacao" titulo="Formação">
          <div className="border-b border-line">
            {formacao.map((f, i) => (
              <Linha key={f.curso} periodo={f.periodo} delay={i * 80}>
                <h3 className="display text-2xl sm:text-3xl">{f.curso}</h3>
                <p className="mt-2 text-lg text-muted">{f.instituicao}</p>
              </Linha>
            ))}
          </div>
        </Secao>

        {/* ───────── Tecnologias ───────── */}
        <Secao id="tecnologias" titulo="Tecnologias">
          <div className="border-b border-line">
            {tecnologias.map((g, i) => (
              <Linha key={g.grupo} periodo={g.grupo} delay={i * 60}>
                <ul className="flex flex-wrap gap-2.5">
                  {g.itens.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-surface px-5 py-2 text-base font-medium transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Linha>
            ))}
          </div>
        </Secao>

        {/* ───────── Contato (bloco azul-marinho) ───────── */}
        <section
          id="contato"
          aria-labelledby="contato-t"
          className="bg-navy text-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
            <MaskTitle
              id="contato-t"
              className="display text-[clamp(3rem,9vw,6rem)]"
            >
              {contato.chamada}
            </MaskTitle>
            <Reveal delay={150}>
              <p className="mt-6 max-w-[52ch] text-lg text-white/75 sm:text-xl">{contato.texto}</p>
              <a
                href={`mailto:${links.email}`}
                className="display mt-10 inline-block break-all text-[clamp(1.5rem,4.6vw,3rem)] underline decoration-sky/60 decoration-2 underline-offset-[0.25em] transition-colors hover:decoration-sky"
              >
                {links.email}
              </a>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${links.email}`}
                  className={`${botao} bg-white text-navy hover:bg-white/90`}
                >
                  <IconMail />
                  {contato.botaoEmail}
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${botao} border border-white/30 hover:border-white hover:bg-white/10`}
                >
                  <IconGithub />
                  GitHub
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${botao} border border-white/30 hover:border-white hover:bg-white/10`}
                >
                  <IconLinkedin />
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
          <footer className="border-t border-white/15">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:px-8">
              <span>{contato.rodape}</span>
              <a href="#inicio" className="transition-colors hover:text-white">
                Voltar ao topo
              </a>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
