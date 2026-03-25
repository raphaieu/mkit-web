<script setup lang="ts">
import type { Creator } from '~/types/creator'

definePageMeta({ layout: 'bio' })

const route = useRoute()
const config = useRuntimeConfig()
const handle = computed(() => String(route.params.handle ?? '').replace(/^@/, ''))

const { data: raw, error, pending } = useFetch<{ data: Creator }>(
  () => `${config.public.apiBase}/api/creators/@${handle.value}`,
  { key: () => `bio-public-${handle.value}` },
)

const creator = computed(() => raw.value?.data ?? null)
const themeClass = computed(() => bioPageThemeClass(creator.value?.profile ?? null))

watchEffect(() => {
  if (error.value && !pending.value) {
    showError({ statusCode: 404, statusMessage: 'Creator não encontrado' })
  }
})

watchEffect(() => {
  const c = creator.value
  if (!c) return
  useSeoMeta({
    title: `${c.name} | mkit`,
    description: c.instagram?.biography ?? `Media kit de ${c.name}`,
    ogTitle: `${c.name} — Media Kit`,
    ogDescription: c.instagram?.biography ?? `Veja o media kit de ${c.name}`,
    ogImage: c.instagram?.profile_picture_url ?? undefined,
    twitterCard: 'summary_large_image',
  })
})

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap',
    },
  ],
})
</script>

<template>
  <!-- Skeleton -->
  <div v-if="pending" class="bio-page mx-auto max-w-[440px] px-6 pb-16 pt-10 md:pt-16">
    <div class="mx-auto max-w-md">
      <div class="flex flex-col items-center">
        <div class="h-24 w-24 shrink-0 animate-pulse rounded-full bg-stone-200" />
        <div class="mt-4 h-6 w-48 animate-pulse rounded-lg bg-stone-200" />
        <div class="mt-2 h-4 w-32 animate-pulse rounded bg-stone-200" />
      </div>
      <div class="mt-8 overflow-hidden rounded-2xl border border-stone-100 bg-stone-100/80">
        <div class="grid grid-cols-3 gap-px">
          <div v-for="i in 3" :key="i" class="h-20 animate-pulse bg-white" />
        </div>
      </div>
      <div class="mt-10 space-y-3">
        <div v-for="i in 3" :key="i" class="h-16 animate-pulse rounded-2xl bg-stone-100" />
      </div>
    </div>
  </div>

  <!-- Main -->
  <div
    v-else-if="creator"
    class="bio-page mx-auto max-w-[440px] pb-8 md:max-w-lg"
    :class="themeClass"
  >
    <BioHeader class="bio-animate-in" :creator="creator" />
    <BioContact class="bio-animate-in" :creator="creator" />
    <BioMetrics class="bio-animate-in" :creator="creator" />
    <BioReachInsights class="bio-animate-in" :creator="creator" />
    <BioAudience class="bio-animate-in" :creator="creator" />
    <BioNiches class="bio-animate-in" :creator="creator" />
    <!-- <BioPostGrid class="bio-animate-in" :creator="creator" /> -->
    <BioPortfolio class="bio-animate-in" :creator="creator" />
    <BioPartnerBrands class="bio-animate-in" :creator="creator" />
    <BioCuratedLinks class="bio-animate-in" :creator="creator" />
    <BioSocialLinks class="bio-animate-in" :creator="creator" />

    <footer class="bio-animate-in mt-10 px-6 pb-8 pt-6 text-center">
      <div class="mx-auto max-w-md border-t border-stone-100 pt-8">
        <p class="text-xs text-stone-400">
          mkit.com.br/<span class="font-medium" style="color: var(--bio-accent-600)">@{{ creator.handle }}</span>
        </p>
        <p class="mt-1 text-[10px] tracking-wide text-stone-300">
          powered by mkit
        </p>
      </div>
    </footer>
  </div>
</template>
