# CLAUDE.md — mkit-web
> Frontend NuxtJS | mkit.com.br
> Leia o PRD.md antes de qualquer decisão arquitetural ou de produto.

---

## Contexto do projeto

Frontend do mkit — plataforma de micro bio sites para (micro)influencers.
Este repo é exclusivamente o frontend. A API vive em `mkit-api` (Laravel 13) em `api.mkit.com.br`.

---

## Stack

| | |
|---|---|
| Framework | NuxtJS (latest) |
| Vue | 3 + Composition API |
| TypeScript | obrigatório em todos os arquivos |
| CSS | TailwindCSS v4 |
| State | Pinia |
| HTTP | `$fetch` / `useFetch` do Nuxt |
| PWA | `@vite-pwa/nuxt` |

---

## Estrutura de URLs

| Rota | Tipo | Render |
|---|---|---|
| `/` | Landing page | SSR |
| `/@:handle` | Bio site público do creator | SSR |
| `/app` | Dashboard (redirect para /app/dashboard) | SPA |
| `/app/dashboard` | Home do painel | SPA/CSR |
| `/app/portfolio` | Gerenciar portfólio | SPA/CSR |
| `/app/settings` | Configurações | SPA/CSR |

---

## Organização de arquivos

```
components/
  landing/              # exclusivos da landing page
    LandingHero.vue
    LandingHowItWorks.vue
    LandingPricing.vue
    LandingDemo.vue
  bio/                  # exclusivos do micro bio site
    BioHeader.vue
    BioMetrics.vue
    BioPostGrid.vue
    BioPortfolio.vue
    BioContact.vue
  dashboard/            # painel do creator
    DashboardStats.vue
    PortfolioForm.vue
    PortfolioList.vue
  ui/                   # genéricos reutilizáveis
    AppButton.vue
    AppCard.vue
    AppAvatar.vue
    AppBadge.vue
    AppModal.vue

layouts/
  default.vue           # landing page (navbar marketing + footer)
  bio.vue               # micro bio site (mínimo, sem nav do produto)
  dashboard.vue         # área logada (sidebar + topbar)

pages/
  index.vue             # landing page, usa layout default
  @[handle].vue         # bio site público, usa layout bio
  app/
    index.vue           # redirect para /app/dashboard
    dashboard.vue
    portfolio.vue
    settings.vue

composables/
  useCreator.ts
  useInstagram.ts
  useAuth.ts
  usePortfolio.ts

stores/
  auth.ts
  creator.ts

types/
  creator.ts
  instagram.ts
  portfolio.ts
```

---

## Convenções de código

- Vue 3 `<script setup>` — sempre, sem exceção
- TypeScript em todos os arquivos `.vue` e `.ts`
- Sem `any` — tipar tudo
- Interfaces para DTOs e respostas da API
- Composables com prefixo `use`
- Props e emits sempre tipados com `defineProps<>()` e `defineEmits<>()`
- Componentes em PascalCase
- Composables em camelCase com `use`

---

## PWA

- Configurado via `@vite-pwa/nuxt`
- Mobile-first em todo layout — breakpoints: mobile → tablet → desktop
- Manifest com nome, ícones, theme_color
- Service worker para cache de assets estáticos
- Páginas de bio site cacheáveis (revalidate on network)

---

## SEO (crítico para páginas públicas)

Páginas `/@handle` precisam de:
```ts
useSeoMeta({
  title: `${creator.name} | mkit`,
  description: creator.biography,
  ogImage: creator.profilePictureUrl,
  ogTitle: `${creator.name} — Media Kit`,
  twitterCard: 'summary_large_image',
})
```

---

## Comunicação com a API

Base URL: `https://api.mkit.com.br`

Usar `useFetch` e `$fetch` do Nuxt. Criar composable centralizado:

```ts
// composables/useApi.ts
const useApi = () => {
  const config = useRuntimeConfig()
  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include', // para Sanctum cookies
  })
}
```

---

## Auth flow

1. User clica "Entrar com Instagram"
2. Front redireciona para `api.mkit.com.br/auth/instagram`
3. Após OAuth, API redireciona para `mkit.com.br/app` com cookie de sessão Sanctum
4. Composable `useAuth` verifica sessão em `/api/me`
5. Middleware de rota protege `/app/*`

---

## Variáveis de ambiente

```env
NUXT_PUBLIC_API_BASE=https://api.mkit.com.br
NUXT_PUBLIC_APP_URL=https://mkit.com.br
```

---

## Design — princípios

- **Mobile-first sempre**: escrever estilos mobile primeiro, usar `md:` e `lg:` para escalar
- **Bio site**: design limpo, focado no creator — deixar as métricas e foto falarem
- **Landing page**: confiança, profissionalismo, conversão
- **Dashboard**: funcional, direto, sem frescura
- Paleta e tipografia a definir — criar `tailwind.config.ts` com tokens do projeto

---

## Fase atual: MVP (Fase 1)

Foco em:
1. Rota `/@handle` SSR funcional com dados reais da API
2. Landing page básica com CTA de cadastro
3. Dashboard mínimo: visualizar bio + gerenciar portfólio
4. PWA configurado desde o início

**Não implementar ainda**: analytics de visitantes, personalização avançada, planos pagos UI.