import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Disco } from "@/components/Disco";
import { Pads } from "@/components/Pads";
import { Player } from "@/components/Player";
import { ProjectCard } from "@/components/ProjectCard";
import { MaskTitle, Reveal } from "@/components/Reveal";
import {
  IconDownload,
  IconGithub,
  IconLinkedin,
  IconMail,
  IconWhatsapp,
} from "@/components/icons";
import {
  base,
  contato,
  experiencia,
  faixas,
  formacao,
  hero,
  links,
  projetos,
  site,
  sobre,
  tecnologias,
} from "@/data/content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const botao =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition duration-150 active:scale-[0.97]";
const botaoCheio = `${botao} bg-gradient-to-r from-a1 to-a2 text-bg hover:opacity-90`;
const botaoVazado = `${botao} border border-line bg-surface/60 hover:border-a1 hover:text-a1`;

const codigoDe = (id: string) => faixas.find((f) => f.id === id)?.codigo ?? "";

/** Uma faixa do álbum: selo com o código (A2, B1…) e o título. */
function Faixa({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mb-12 flex items-center gap-4 sm:mb-16 sm:gap-6">
        <span aria-hidden className="selo-faixa">
          {codigoDe(id)}
        </span>
        <MaskTitle id={`${id}-t`} className="display text-5xl sm:text-7xl">
          {titulo}
        </MaskTitle>
      </div>
      {children}
    </section>
  );
}

/** Linha do encarte: período à esquerda, conteúdo à direita, com o fio do tempo se desenhando. */
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
      <div className="relative grid gap-3 py-8 pl-7 md:grid-cols-12 md:gap-8">
        <span
          aria-hidden
          className="fio-tempo absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-a1 to-a2"
        />
        <p className="pixel text-base text-a1 md:col-span-3 md:pt-1.5">{periodo}</p>
        <div className="md:col-span-9">{children}</div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const [nome, sobrenome] = site.nome.split(" ");

  return (
    <>
      <div aria-hidden className="fundo" />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-a1 focus:px-4 focus:py-2 focus:text-bg"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo">
        {/* ───────── A1 · Abertura ───────── */}
        <section
          id="inicio"
          aria-labelledby="inicio-t"
          className="relative flex min-h-svh items-center px-5 py-16 sm:px-8"
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <h1 id="inicio-t" className="display text-[clamp(3.4rem,10.5vw,7rem)]">
                <span className="line-mask">
                  <span style={d(250)}>{nome}</span>
                </span>
                <span className="line-mask">
                  <span style={d(340)}>{sobrenome}</span>
                </span>
              </h1>

              <p className="rise mt-7 text-xl font-semibold sm:text-2xl" style={d(700)}>
                {hero.subtitulo}
              </p>
              <p
                className="rise mt-4 max-w-[36ch] text-lg leading-relaxed text-muted sm:text-xl"
                style={d(800)}
              >
                {hero.frase}
              </p>

              <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(920)}>
                <a href="#projetos" className={botaoCheio}>
                  {hero.botaoProjetos}
                </a>
                <a
                  href={links.curriculo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={botaoVazado}
                >
                  <IconDownload />
                  {hero.botaoCurriculo}
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={botaoVazado}
                >
                  <IconWhatsapp />
                  {hero.botaoWhatsapp}
                </a>
              </div>
            </div>

            {/* A capa do álbum, com o LP saindo de dentro */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="capa-wrap ml-[4%] w-[62%] max-w-[23rem] sm:ml-0 lg:w-[72%]">
                <Disco className="capa-disco" codigo="LP" />
                <div className="capa">
                  <Image
                    src={`${base}${sobre.foto}`}
                    alt={`Retrato de ${site.nome}`}
                    fill
                    priority
                    sizes="(min-width:1024px) 370px, 62vw"
                    className="object-cover object-[34%_18%]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-16"
                  >
                    <span className="display text-lg leading-none text-white sm:text-xl">
                      {site.nome}
                    </span>
                    <span className="pixel text-xs text-white/80">estéreo 33 rpm</span>
                  </div>
                </div>
                <p className="adesivo -left-5 -top-5 h-24 w-24 p-2 text-[0.8rem] sm:-left-8 sm:-top-8 sm:h-28 sm:w-28 sm:text-sm">
                  {hero.selo}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── A2 · Sobre ───────── */}
        <Faixa id="sobre" titulo={sobre.titulo}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="max-w-[58ch] text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
                {sobre.texto}
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-7">
                <h3 className="pixel text-lg text-a1">Ficha técnica</h3>
                <dl className="mt-3 divide-y divide-line">
                  {sobre.fatos.map((f) => (
                    <div key={f.rotulo} className="py-3.5">
                      <dt className="text-sm text-muted">{f.rotulo}</dt>
                      <dd className="mt-0.5 font-semibold">{f.valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Faixa>

        {/* ───────── A3 · Projetos ───────── */}
        <Faixa id="projetos" titulo="Projetos">
          <div className="space-y-20 sm:space-y-28">
            {projetos
              .filter((p) => p.destaque)
              .map((p) => (
                <Reveal key={p.nome}>
                  <ProjectCard projeto={p} />
                </Reveal>
              ))}
            <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
              {projetos
                .filter((p) => !p.destaque)
                .map((p, i) => (
                  <Reveal key={p.nome} delay={i * 100}>
                    <ProjectCard projeto={p} />
                  </Reveal>
                ))}
            </div>
          </div>
        </Faixa>

        {/* ───────── Intervalo: vire o disco ───────── */}
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <Reveal className="vira flex flex-col items-center gap-8 text-center">
            <div aria-hidden className="vira-disco">
              <div className="disco">
                <div className="disco-rotulo rotulo-a">Lado A</div>
              </div>
              <div className="disco">
                <div className="disco-rotulo rotulo-b">Lado B</div>
              </div>
            </div>
            <div>
              <p className="display text-4xl sm:text-5xl">Vire o disco</p>
              <p className="mt-3 text-lg text-muted">
                No Lado B: experiência, formação, tecnologias e contato.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ───────── B1 · Experiência ───────── */}
        <Faixa id="experiencia" titulo="Experiência">
          {experiencia.map((e) => (
            <Linha key={e.cargo} periodo={e.periodo}>
              <h3 className="display text-3xl sm:text-4xl">{e.cargo}</h3>
              <ul className="mt-6 max-w-[62ch] space-y-3.5 text-lg text-muted">
                {e.pontos.map((p) => (
                  <li key={p} className="flex gap-4 leading-relaxed">
                    <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-a2" />
                    {p}
                  </li>
                ))}
              </ul>
            </Linha>
          ))}
        </Faixa>

        {/* ───────── B2 · Formação ───────── */}
        <Faixa id="formacao" titulo="Formação">
          {formacao.map((f, i) => (
            <Linha key={f.curso} periodo={f.periodo} delay={i * 80}>
              <h3 className="display text-2xl sm:text-3xl">{f.curso}</h3>
              <p className="mt-2 text-lg text-muted">{f.instituicao}</p>
            </Linha>
          ))}
        </Faixa>

        {/* ───────── B3 · Tecnologias ───────── */}
        <Faixa id="tecnologias" titulo="Tecnologias">
          <Reveal>
            <Pads grupos={tecnologias} />
          </Reveal>
        </Faixa>

        {/* ───────── B4 · Contato ───────── */}
        <section
          id="contato"
          aria-labelledby="contato-t"
          className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-8 flex items-center gap-4">
                <span aria-hidden className="selo-faixa">
                  {codigoDe("contato")}
                </span>
                <p className="pixel text-lg text-muted">{contato.titulo}</p>
              </div>
              <MaskTitle id="contato-t" className="display text-[clamp(2.5rem,6.6vw,4.75rem)]">
                {contato.chamada}
              </MaskTitle>
              <Reveal delay={150}>
                <p className="mt-6 max-w-[48ch] text-lg text-muted sm:text-xl">{contato.texto}</p>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${links.whatsappRotulo} (abre em nova aba)`}
                  className="display mt-9 inline-flex items-center gap-4 text-[clamp(1.7rem,5.4vw,3.2rem)] underline decoration-a1/60 decoration-2 underline-offset-[0.25em] transition-colors hover:decoration-a1"
                >
                  <IconWhatsapp className="h-[0.8em] w-[0.8em] shrink-0 text-a1" />
                  {links.whatsappRotulo}
                </a>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={botaoCheio}
                  >
                    <IconWhatsapp />
                    {hero.botaoWhatsapp}
                  </a>
                  <a href={`mailto:${links.email}`} className={botaoVazado}>
                    <IconMail />
                    {contato.botaoEmail}
                  </a>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={botaoVazado}
                  >
                    <IconGithub />
                    GitHub
                  </a>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={botaoVazado}
                  >
                    <IconLinkedin />
                    LinkedIn
                  </a>
                  <a
                    href={links.curriculo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={botaoVazado}
                  >
                    <IconDownload />
                    {hero.botaoCurriculo}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Disco com a chamada girando em anel */}
            <div aria-hidden className="relative mx-auto w-[min(70vw,22rem)] lg:col-span-5">
              <svg viewBox="0 0 200 200" className="anel absolute inset-0 h-full w-full">
                <defs>
                  <path id="anel-caminho" d="M100 100m-93 0a93 93 0 1 1 186 0a93 93 0 1 1-186 0" />
                </defs>
                <text className="pixel fill-muted text-[11px]">
                  <textPath href="#anel-caminho" textLength="578">
                    vamos conversar? ★ estágio ★ freelas ★ vamos conversar? ★ estágio ★ freelas ★
                  </textPath>
                </text>
              </svg>
              <Disco className="m-[11%]" codigo="B4" />
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 border-t border-line px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:px-8">
          <span>{contato.rodape}</span>
          <a href="#inicio" className="transition-colors hover:text-fg">
            Tocar de novo do início
          </a>
        </footer>
      </main>

      <Player />
    </>
  );
}
