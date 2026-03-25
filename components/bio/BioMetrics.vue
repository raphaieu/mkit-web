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
    { label: 'Seguidores', value: fmt(ig?.followers_count ?? 0) },
    { label: 'Posts', value: fmt(ig?.media_count ?? ig?.posts?.length ?? 0) },
    { label: 'Engajamento', value: eng },
  ]
})
</script>

<template>
  <section class="mt-8 px-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4 tracking-[0.1em]">
        Alcance & Performance
      </p>
    </div>
    <div class="mx-auto max-w-md overflow-hidden rounded-2xl border border-stone-100 bg-stone-100">
      <div class="grid grid-cols-3 gap-px bg-stone-100">
        <div
          v-for="m in metrics"
          :key="m.label"
          class="bg-white py-4 text-center"
        >
          <div class="text-xl font-semibold tabular-nums text-gray-900">
            {{ m.value }}
          </div>
          <div class="mt-1 text-[11px] font-normal uppercase tracking-[0.08em] text-gray-400">
            {{ m.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
