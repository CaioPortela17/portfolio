/**
 * Todo o conteúdo do portfólio fica aqui.
 * Edite textos, projetos e links neste arquivo — não precisa mexer nos componentes.
 */

/** Prefixo do GitHub Pages (/portfolio) em produção; vazio no dev. */
export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  nome: "Caio Portela",
  titulo: "Desenvolvedor Web",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://caioportela17.github.io/portfolio",
  descricao:
    "Portfólio de Caio Portela, desenvolvedor web e estudante de Ciência da Computação. Projetos, experiência e contato para vagas de estágio.",
};

export const links = {
  email: "caioportela.dev@gmail.com",
  github: "https://github.com/CaioPortela17",
  linkedin: "https://www.linkedin.com/in/caio-portela-9303003a7/",
  curriculo: `${base}/Caio_Portela_Curriculo.pdf`,
};

export const nav = [
  { id: "inicio", rotulo: "Início" },
  { id: "sobre", rotulo: "Sobre" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "experiencia", rotulo: "Experiência" },
  { id: "formacao", rotulo: "Formação" },
  { id: "tecnologias", rotulo: "Tecnologias" },
  { id: "contato", rotulo: "Contato" },
];

export const hero = {
  selo: "Disponível para estágio",
  subtitulo: "Desenvolvedor Web · Estudante de Ciência da Computação",
  frase: "Construo produtos web reais, do levantamento de requisitos à entrega.",
  botaoProjetos: "Ver projetos",
  botaoCurriculo: "Baixar currículo",
};

export const sobre = {
  titulo: "Sobre",
  foto: "/foto.jpg", // arquivo em public/foto.jpg
  fatos: [
    { rotulo: "Graduação", valor: "Ciência da Computação · UNIFOR · 3º semestre" },
    { rotulo: "Formação", valor: "Full Stack Developer · Digital College" },
    { rotulo: "Atuação", valor: "Freelancer desde mai/2026" },
    { rotulo: "Produto no ar", valor: "Satisfeito, pesquisa de satisfação" },
  ],
  texto:
    "Estudante do 3º semestre de Ciência da Computação na UNIFOR e da Formação Full Stack Developer na Digital College. Desde maio de 2026, desenvolvo sites institucionais e landing pages como freelancer para empresas, do levantamento de requisitos à entrega. Também criei o Satisfeito, uma plataforma de pesquisa de satisfação que já está no mercado. Estou em busca de um estágio em TI para aplicar o que já sei e continuar evoluindo.",
};

export type Projeto = {
  nome: string;
  destaque?: boolean;
  descricao: string;
  tags: string[];
  /** Caminho em /public (ex.: "/projetos/satisfeito.jpg"). Se o arquivo não existir, aparece um gradiente com o nome. */
  imagem: string;
  links: { rotulo: string; url: string }[];
};

export const projetos: Projeto[] = [
  {
    nome: "Satisfeito",
    destaque: true,
    descricao:
      "Plataforma de pesquisa de satisfação para empresas, já no mercado. O cliente responde pelo celular via QR code, sem criar conta, em menos de 30 segundos. A empresa acompanha NPS, gráficos e um relatório da equipe gerado por IA. Autenticação e banco no Supabase com Row Level Security, proteção contra bots com Cloudflare Turnstile, deploy na Vercel com CI no GitHub Actions.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Claude API"],
    imagem: "/projetos/satisfeito.jpg",
    links: [
      { rotulo: "Site", url: "https://satisfeito.vercel.app" },
      { rotulo: "Vitrine", url: "https://github.com/CaioPortela17/satisfeito-portfolio" },
    ],
  },
  {
    nome: "Catálogo de Jogos",
    descricao:
      "Site em React que consome a API pública FreeToGame, com busca, filtros e rotas dinâmicas.",
    tags: ["React", "Vite", "JavaScript"],
    imagem: "/projetos/catalogo-jogos.jpg",
    links: [
      { rotulo: "Site", url: "https://react-g.onrender.com" },
      { rotulo: "Código", url: "https://github.com/CaioPortela17/catalogo-jogos-react" },
    ],
  },
  {
    nome: "O Cartógrafo de Venn",
    descricao:
      "Jogo educativo web sobre conjuntos e Diagrama de Venn para o ensino médio, desenvolvido na UNIFOR.",
    tags: ["HTML", "JavaScript"],
    imagem: "/projetos/cartografo-de-venn.jpg",
    links: [
      { rotulo: "Jogar", url: "https://caioportela17.github.io/o-cartagrafo-de-venn/" },
      { rotulo: "Código", url: "https://github.com/CaioPortela17/o-cartagrafo-de-venn" },
    ],
  },
];

export const experiencia = [
  {
    cargo: "Desenvolvedor Web Freelancer",
    periodo: "mai/2026 – hoje",
    pontos: [
      "Sites institucionais e landing pages para empresas, do levantamento de requisitos à entrega.",
      "Interfaces responsivas com React, HTML, CSS e JavaScript, com foco em performance e UX.",
      "Contato direto com clientes para transformar necessidades de negócio em soluções técnicas.",
    ],
  },
];

export const formacao = [
  {
    curso: "Bacharelado em Ciência da Computação",
    instituicao: "UNIFOR",
    periodo: "ago/2025 – jun/2029 (previsto)",
  },
  {
    curso: "Formação Full Stack Developer",
    instituicao: "Digital College",
    periodo: "jan/2026 – dez/2026",
  },
];

export const tecnologias = [
  { grupo: "Linguagens", itens: ["JavaScript", "TypeScript", "Java", "SQL"] },
  { grupo: "Front-end", itens: ["React", "Next.js", "Tailwind", "HTML", "CSS"] },
  { grupo: "Back-end", itens: ["Node.js", "APIs REST", "Supabase"] },
  { grupo: "Ferramentas", itens: ["Git", "GitHub", "Pacote Office"] },
];

export const contato = {
  titulo: "Contato",
  chamada: "Vamos conversar?",
  texto: "Estou aberto a oportunidades de estágio e a novos projetos.",
  botaoEmail: "Enviar e-mail",
  rodape: "© 2026 Caio Portela",
};
