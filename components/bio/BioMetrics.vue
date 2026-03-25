<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

const metrics = computed(() => {
  const ig = props.creator.instagram
  const eng = ig?.engagement_rate != null ? `${ig.engagement_rate.toFixed(1)}%` : '—'
  return [
    { label: 'Seguidores', value: fmt(ig?.followers_count ?? 0), icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
    { label: 'Posts', value: fmt(ig?.media_count ?? ig?.posts?.length ?? 0), icon: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z' },
    { label: 'Engajamento', value: eng, icon: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6' },
  ]
})
</script>

<template>
  <section class="px-5">
    <div class="mx-auto grid max-w-md grid-cols-3 gap-2">
      <div
        v-for="m in metrics"
        :key="m.label"
        class="rounded-xl border border-gray-200 bg-white px-2 py-4 text-center"
      >
        <svg
          class="mx-auto mb-1.5 h-4 w-4"
          style="color: var(--bio-accent)"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
        >
          <path :d="m.icon" />
        </svg>
        <p class="text-lg font-medium" style="color: var(--bio-text)">{{ m.value }}</p>
        <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider" style="color: var(--bio-muted)">{{ m.label }}</p>
      </div>
    </div>
  </section>
</template>
