# Portfólio — Caio Portela

Site de portfólio pessoal em uma página só, feito com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**. Estático, sem banco de dados, tema escuro por padrão com opção de tema claro.

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Como editar

- **Textos, projetos, links e tecnologias:** `src/data/content.ts`
- **Prints dos projetos:** coloque as imagens em `public/projetos/` (nomes em `content.ts`). Sem imagem, o card mostra um gradiente com o nome.
- **Currículo:** coloque o PDF em `public/Caio_Portela_Curriculo.pdf`


## Deploy (GitHub Pages)

Push na branch `main` publica no GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Em Settings → Pages, escolha **Source: GitHub Actions**. Endereço: https://caioportela17.github.io/portfolio/
