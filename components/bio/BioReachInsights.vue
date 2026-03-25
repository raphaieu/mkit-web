<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

function fmt(n: number | null | undefined): string {
  if (n == null) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return new Intl.NumberFormat('pt-BR').format(n)
}

function fmtDelta(n: number | null | undefined): string {
  if (n == null) return '—'
  const sign = n > 0 ? '+' : ''
  if (Math.abs(n) >= 1_000) return `${sign}${(n / 1_000).toFixed(1)}K`
  return `${sign}${new Intl.NumberFormat('pt-BR').format(n)}`
}

const perf = computed(() => props.creator.insights?.performance ?? null)
const hasData = computed(() => perf.value != null)

const cards = computed(() => {
  if (!perf.value) return []
  return [
    { label: 'Alcance', value: fmt(perf.value.reach_28d), sub: '28 dias', icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
    { label: 'Impressões', value: fmt(perf.value.total_interactions_28d), sub: '28 dias', icon: 'M18 20V10 M12 20V4 M6 20v-6' },
    { label: 'Engajamento', value: props.creator.instagram?.engagement_rate != null ? `${props.creator.instagram.engagement_rate.toFixed(1)}%` : '—', sub: 'média', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
    { label: 'Novos seg.', value: fmtDelta(perf.value.follower_count_delta_28d), sub: '28 dias', icon: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M20 8v6 M23 11h-6' },
  ]
})

/* ── SVG sparkline from reach_series ── */
const sparklinePath = computed(() => {
  const series = perf.value?.reach_series ?? []
  if (series.length < 2) return ''
  const values = series.map(p => p.value)
  const maxV = Math.max(...values) || 1
  const minV = Math.min(...values)
  const range = maxV - minV || 1
  const W = 280
  const H = 60
  const pad = 4
  const step = (W - pad * 2) / (values.length - 1)
  return values
    .map((v, i) => {
      const x = pad + i * step
      const y = pad + (1 - (v - minV) / range) * (H - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const hasSparkline = computed(() => sparklinePath.value.length > 0)
</script>

<template>
  <section v-if="hasData" class="px-5 py-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4">Alcance & Performance</p>

      <!-- Sparkline chart -->
      <div v-if="hasSparkline" class="mb-4 rounded-xl border border-gray-200 bg-white px-4 py-3">
        <p class="mb-2 text-[10px] font-medium uppercase tracking-wider" style="color: var(--bio-muted)">Alcance por dia</p>
        <svg :viewBox="`0 0 280 60`" class="h-14 w-full" preserveAspectRatio="none">
          <path :d="sparklinePath" fill="none" stroke="var(--bio-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="mt-1 text-[9px]" style="color: var(--bio-muted)">
          {{ (perf?.reach_series?.length ?? 0) }} pontos · últimos dias da janela
        </p>
      </div>

      <!-- 2×2 metric cards -->
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="card in cards"
          :key="card.label"
          class="rounded-xl border border-gray-200 bg-white px-3 py-4 text-center"
        >
          <svg
            class="mx-auto mb-1.5 h-4 w-4"
            style="color: var(--bio-accent)"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
          >
            <path :d="card.icon" />
          </svg>
          <span class="block text-lg font-medium" style="color: var(--bio-text)">{{ card.value }}</span>
          <span class="mt-0.5 block text-[10px] font-medium uppercase tracking-wider" style="color: var(--bio-muted)">{{ card.label }}</span>
          <span class="block text-[10px]" style="color: var(--bio-muted)">{{ card.sub }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
