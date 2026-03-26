<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'mkit — Media Kit dinâmico para micro-influencers',
  description:
    'Crie seu media kit profissional em minutos. Dados reais do Instagram, sempre atualizados. Compartilhe com marcas e feche parcerias.',
  ogTitle: 'mkit — Media Kit dinâmico para micro-influencers',
  ogDescription:
    'Dados reais do Instagram, sempre atualizados. Crie seu bio site profissional e compartilhe com marcas.',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <LandingHero />
    <LandingLogos />
    <LandingHowItWorks />
    <LandingFeatures />
    <LandingDemo />
    <LandingPricing />
    <LandingCTA />
  </div>
</template>
