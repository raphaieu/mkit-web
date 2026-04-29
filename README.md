# mkit-web

Frontend do **mkit.com.br**, uma plataforma que transforma dados do Instagram em um media kit público e dinâmico para creators.

## Sobre o produto

O mkit resolve um problema comum de microinfluencers: apresentar resultados reais para marcas de forma profissional, sem depender de PDF manual ou troca de mensagens no direct.

Com o mkit, cada creator possui uma página pública em `mkit.com.br/@handle` com:

- perfil e bio;
- métricas relevantes de audiência;
- portfólio de trabalhos;
- links e formas de contato.

Ao mesmo tempo, existe uma área logada em `mkit.com.br/app/*` para gerenciamento de conteúdo e dados.

## Stack principal

- `Nuxt 3` (Vue 3 + Composition API + TypeScript)
- `Pinia` para gerenciamento de estado
- `Tailwind CSS v4` para estilização
- `@vite-pwa/nuxt` para recursos de PWA
- `useFetch` / `$fetch` (Nuxt) para comunicação com API

## Arquitetura da aplicação

### Renderização por tipo de rota

As regras de rota no Nuxt seguem a estratégia:

- `SSR` para páginas públicas e SEO:
  - `/`
  - `/@handle`
- `SPA/CSR` para dashboard autenticado:
  - `/app/**`

### PWA

O projeto já está configurado como Progressive Web App, com:

- manifesto (`name`, `icons`, `theme_color`, `start_url`);
- service worker com `autoUpdate`;
- cache de assets estáticos;
- estratégia `NetworkFirst` para chamadas da API principal.

## Módulos e áreas funcionais

### 1) Landing page (marketing)

Página inicial com seções de proposta de valor, demonstração, pricing e CTA.

Arquivos relevantes:
- `pages/index.vue`
- `components/landing/*`

### 2) Bio site público do creator

Página pública dinâmica por handle em `pages/@[handle].vue`, consumindo dados da API e montando SEO dinâmico por creator.

Arquivos relevantes:
- `pages/@[handle].vue`
- `components/bio/*`
- `layouts/bio.vue`
- `composables/useBioPublicTheme.ts`

### 3) Dashboard do creator

Área autenticada para visualizar status da conta, link público, dados de Instagram e gestão de portfólio.

Arquivos relevantes:
- `pages/app/dashboard.vue`
- `pages/app/portfolio.vue`
- `pages/app/settings.vue`
- `components/dashboard/*`
- `layouts/dashboard.vue`

## Fluxo de autenticação (Instagram)

Resumo do fluxo atual implementado:

1. usuário inicia login via endpoint de OAuth do backend;
2. backend redireciona de volta com `?token=...`;
3. plugin `plugins/auth-token.client.ts` captura o token e salva em cookie `mkit_token`;
4. `stores/auth.ts` usa esse token para buscar usuário em `/api/me`;
5. middleware `middleware/auth.ts` protege as rotas em `/app/*`.

## Integração com API

Backend esperado: `https://api.mkit.com.br`.

A aplicação utiliza:

- composable `composables/useApi.ts` para criar cliente `$fetch` com base URL e header `Authorization`;
- chamadas diretas com `useFetch`/`$fetch` em páginas e stores.

## Estrutura de pastas (visão rápida)

```bash
.
├── assets/css/            # estilos globais e tema bio
├── components/
│   ├── bio/               # blocos do bio site público
│   ├── dashboard/         # componentes da área logada
│   ├── landing/           # componentes da landing
│   └── ui/                # componentes reutilizáveis
├── composables/           # lógica reutilizável (API, auth, creator, etc.)
├── layouts/               # default, bio e dashboard
├── middleware/            # proteção de rotas
├── pages/                 # roteamento baseado em arquivos
├── plugins/               # plugin de captura do token OAuth
├── stores/                # Pinia stores
└── types/                 # contratos TypeScript
```

## Variáveis de ambiente

Crie um arquivo `.env` com:

```env
NUXT_PUBLIC_API_BASE=https://api.mkit.com.br
NUXT_PUBLIC_APP_URL=https://mkit.com.br
```

## Como rodar localmente

### Pré-requisitos

- Node.js 20+ (recomendado)
- npm, pnpm ou yarn (exemplos abaixo com npm)

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

App local padrão: `http://localhost:3000`

### Build de produção

```bash
npm run build
npm run preview
```

## Scripts disponíveis

- `npm run dev` — inicia ambiente de desenvolvimento
- `npm run build` — gera build de produção
- `npm run generate` — gera versão estática (quando aplicável)
- `npm run preview` — sobe servidor local do build

## Estado atual do projeto

O repositório já contém:

- landing page funcional;
- rota pública por handle (`/@handle`) com carregamento de dados;
- dashboard com áreas de `dashboard`, `portfólio` e `configurações`;
- integração de autenticação por token;
- base PWA configurada.

## Repositório de backend relacionado

Este projeto é apenas frontend. A API vive em outro repositório/serviço (`mkit-api`, stack Laravel) e é consumida via `api.mkit.com.br`.
