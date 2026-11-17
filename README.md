# Portfólio — Caio Portela

Site de portfólio pessoal em uma página só, feito com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**. Estático, sem banco de dados.

No ar em https://caioportela17.github.io/portfolio/

## O conceito: o site é um álbum

O visual junta as duas coisas de que eu gosto fora do código, música e video game. Cada seção é uma faixa de um disco de vinil:

| Lado A | Lado B |
| --- | --- |
| A1 Abertura | B1 Experiência |
| A2 Sobre | B2 Formação |
| A3 Projetos | B3 Tecnologias |
| | B4 Contato |

- **Player fixo no rodapé:** é o menu do site. Mostra a faixa atual, o progresso da página, anterior/próxima e a lista de faixas.
- **Discos que giram:** a 33 rpm, e rolar a página "arranha" o disco para frente e para trás.
- **Vire o disco:** ao passar para o Lado B, o disco vira e as cores de destaque mudam de rosa e manga para verde-água e lilás.
- **Projetos como singles:** o print é a capa e o disco escorrega para fora dela.
- **Tecnologias como pads de sampler:** cada tecnologia acende e toca uma nota ao clicar (dá para desligar o som).
- **Conquistas:** aparece "Faixa desbloqueada" a cada seção nova e "Álbum completo" no fim.
- **Código secreto:** ↑ ↑ ↓ ↓ ← → ← → B A liga o modo 78 rpm.

Quem tem "reduzir movimento" ativado no sistema vê o site sem as animações.

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção (gera a pasta out/)
npm run lint
```

## Como editar

Quase tudo se edita em um arquivo só, sem mexer nos componentes:

- **Textos, projetos, links, WhatsApp e tecnologias:** `src/data/content.ts`
- **Faixas (seções do menu):** lista `faixas` em `src/data/content.ts`. O `id` precisa bater com o id da seção em `src/app/page.tsx`.
- **Prints dos projetos:** coloque as imagens em `public/projetos/` (nomes em `content.ts`). Sem imagem, a capa mostra um gradiente com o nome.
- **Foto da capa:** `public/foto.jpg`
- **Currículo:** `public/Caio_Portela_Curriculo.pdf`
- **Cores e animações:** `src/app/globals.css` (as cores ficam nas variáveis do `:root`)

## Estrutura

```
src/
  app/
    page.tsx         a página, faixa por faixa
    layout.tsx       fontes e metadados
    globals.css      tema, disco de vinil e animações
  components/
    Player.tsx       player/menu, conquistas e código secreto
    Disco.tsx        disco de vinil
    Pads.tsx         pads de tecnologias com som (Web Audio)
    ProjectCard.tsx  capa e dados de cada projeto
    Reveal.tsx       revelar ao rolar
    icons.tsx        ícones em SVG
  data/content.ts    todo o conteúdo do site
  lib/giro.ts        laço único que gira todos os discos
```

## Deploy (GitHub Pages)

Push na branch `main` publica no GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Em Settings → Pages, escolha **Source: GitHub Actions**.
