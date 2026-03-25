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
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap' },
  ],
})
</script>

<template>
  <!-- Skeleton -->
  <div v-if="pending" class="bio-page mx-auto max-w-[440px] px-5 pb-16 pt-10 md:pt-16">
    <div class="mx-auto max-w-md">
      <div class="flex gap-4">
        <div class="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-200" />
        <div class="flex-1 space-y-3 pt-2">
          <div class="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div class="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div class="mt-6 grid grid-cols-3 gap-2">
        <div v-for="i in 3" :key="i" class="h-16 animate-pulse rounded-xl bg-gray-100" />
      </div>
      <div class="mt-8 space-y-3">
        <div v-for="i in 3" :key="i" class="h-14 animate-pulse rounded-xl bg-gray-100" />
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
    <BioMetrics class="bio-animate-in" :creator="creator" />
    <BioContact class="bio-animate-in" :creator="creator" />
    <BioReachInsights class="bio-animate-in" :creator="creator" />
    <BioAudience class="bio-animate-in" :creator="creator" />
    <BioNiches class="bio-animate-in" :creator="creator" />
    <BioPostGrid class="bio-animate-in" :creator="creator" />
    <BioPortfolio class="bio-animate-in" :creator="creator" />
    <BioPartnerBrands class="bio-animate-in" :creator="creator" />
    <BioCuratedLinks class="bio-animate-in" :creator="creator" />
    <BioSocialLinks class="bio-animate-in" :creator="creator" />

    <!-- Footer -->
    <footer class="bio-animate-in mt-6 px-5 pt-6 pb-4 text-center">
      <div class="mx-auto h-px max-w-md bg-gray-200" />
      <p class="mt-5 text-[11px] tracking-wide" style="color: var(--bio-muted)">
        mkit.com.br/<span style="color: var(--bio-accent)">@{{ creator.handle }}</span>
      </p>
      <p class="mt-1.5 text-[9px] uppercase tracking-widest" style="color: #ccc">
        powered by mkit
      </p>
    </footer>
  </div>
</template>
