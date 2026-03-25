<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

const stats = computed(() => {
  const ig = props.creator.instagram
  const engagement =
    ig?.engagement_rate != null ? `${ig.engagement_rate.toFixed(1)}%` : '—'

  return [
    {
      label: 'Seguidores',
      value: formatNumber(ig?.followers_count ?? 0),
    },
    {
      label: 'Taxa de engajamento',
      value: engagement,
    },
    {
      label: 'Posts',
      value: formatNumber(ig?.media_count ?? 0),
    },
  ]
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="rounded-xl border border-gray-200 bg-white p-4"
    >
      <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
      <p class="mt-1 text-xs text-gray-400">{{ stat.label }}</p>
    </div>
  </div>
</template>
