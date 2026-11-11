import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { IconDownload, IconGithub, IconLinkedin, IconMail } from "@/components/icons";
import Image from "next/image";
import {
  base,
  contato,
  experiencia,
  formacao,
  hero,
  links,
  projetos,
  site,
  sobre,
  tecnologias,
} from "@/data/content";

function Titulo({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-10 flex items-center gap-4 text-3xl font-bold tracking-tight sm:text-4xl">
      {children}
      <span aria-hidden className="h-px flex-1 bg-line" />
    </h2>
  );
}

function Secao({
  id,
  titulo,
  children,
}: {
  id: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
      <Reveal>
        <Titulo id={`${id}-t`}>{titulo}</Titulo>
      </Reveal>
      {children}
    </section>
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
        {/* Início */}
        <section
          id="inicio"
          aria-labelledby="inicio-t"
          className="relative flex min-h-svh items-center overflow-hidden px-5 pb-16 pt-28"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px] sm:h-[720px] sm:w-[720px]"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <p
              className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium"
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <span aria-hidden className="dot-live h-2.5 w-2.5 rounded-full bg-green-500" />
              {hero.selo}
            </p>
            <h1
              id="inicio-t"
              className="rise mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              {site.nome}
            </h1>
            <p
              className="rise mt-4 text-lg font-semibold text-accent sm:text-2xl"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              {hero.subtitulo}
            </p>
            <p
              className="rise mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              {hero.frase}
            </p>
            <div
              className="rise mt-10 flex flex-col gap-3 sm:flex-row"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              <a
                href="#projetos"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-fg transition-opacity hover:opacity-90"
              >
                {hero.botaoProjetos}
              </a>
              <a
                href={links.curriculo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-7 py-3.5 font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <IconDownload />
                {hero.botaoCurriculo}
              </a>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <Secao id="sobre" titulo={sobre.titulo}>
          <Reveal delay={80}>
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-12">
              <Image
                src={`${base}${sobre.foto}`}
                alt="Foto de Caio Portela"
                width={640}
                height={640}
                sizes="224px"
                className="h-44 w-44 shrink-0 rounded-2xl border border-line object-cover sm:h-56 sm:w-56"
              />
              <p className="max-w-2xl text-lg leading-relaxed text-muted">{sobre.texto}</p>
            </div>
          </Reveal>
        </Secao>

        {/* Projetos */}
        <Secao id="projetos" titulo="Projetos">
          <div className="grid gap-6 lg:grid-cols-2">
            {projetos.map((p, i) => (
              <Reveal key={p.nome} delay={i * 80} className={p.destaque ? "lg:col-span-2" : ""}>
                <ProjectCard projeto={p} />
              </Reveal>
            ))}
          </div>
        </Secao>

        {/* Experiência */}
        <Secao id="experiencia" titulo="Experiência">
          <div className="space-y-6">
            {experiencia.map((e) => (
              <Reveal key={e.cargo}>
                <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">{e.cargo}</h3>
                    <p className="text-sm font-medium text-accent">{e.periodo}</p>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-muted">
                    {e.pontos.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Secao>

        {/* Formação */}
        <Secao id="formacao" titulo="Formação">
          <div className="grid gap-6 sm:grid-cols-2">
            {formacao.map((f, i) => (
              <Reveal key={f.curso} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <p className="text-sm font-medium text-accent">{f.periodo}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{f.curso}</h3>
                  <p className="mt-1 text-muted">{f.instituicao}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Secao>

        {/* Tecnologias */}
        <Secao id="tecnologias" titulo="Tecnologias">
          <div className="grid gap-6 sm:grid-cols-2">
            {tecnologias.map((g, i) => (
              <Reveal key={g.grupo} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    {g.grupo}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.itens.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-sm font-medium"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Secao>

        {/* Contato */}
        <Secao id="contato" titulo={contato.titulo}>
          <Reveal>
            <div className="rounded-2xl border border-line bg-gradient-to-br from-accent-strong/30 to-surface p-8 sm:p-12">
              <p className="max-w-xl text-xl font-medium leading-relaxed">{contato.texto}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-fg transition-opacity hover:opacity-90"
                >
                  <IconMail />
                  {contato.botaoEmail}
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-7 py-3.5 font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  <IconGithub />
                  GitHub
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-7 py-3.5 font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  <IconLinkedin />
                  LinkedIn
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">{links.email}</p>
            </div>
          </Reveal>
        </Secao>
      </main>

      <footer className="border-t border-line px-5 py-8 text-center text-sm text-muted">
        {contato.rodape}
      </footer>
    </>
  );
}
