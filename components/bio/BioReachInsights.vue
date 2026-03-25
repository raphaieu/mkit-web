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

const W = 280
const H = 96
const pad = 4

const sparklinePaths = computed(() => {
  const series = perf.value?.reach_series ?? []
  if (series.length < 2) return { line: '', area: '' }
  const values = series.map(p => p.value)
  const maxV = Math.max(...values) || 1
  const minV = Math.min(...values)
  const range = maxV - minV || 1
  const step = (W - pad * 2) / (values.length - 1)
  const bottom = H - pad

  const points = values.map((v, i) => {
    const x = pad + i * step
    const y = pad + (1 - (v - minV) / range) * (bottom - pad * 2)
    return { x, y }
  })

  const line = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ')

  const area = `${line} L ${points[points.length - 1]!.x.toFixed(1)},${bottom} L ${points[0]!.x.toFixed(1)},${bottom} Z`

  return { line, area }
})

const hasSparkline = computed(() => sparklinePaths.value.line.length > 0)

const gradientId = `bioReachFill-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
</script>

<template>
  <section v-if="hasData" class="mt-5 px-6">
    <div class="mx-auto max-w-md">
      <div
        v-if="hasSparkline"
        class="mb-3 rounded-2xl border border-stone-100 bg-white p-5"
      >
        <div class="mb-4 flex items-baseline justify-between">
          <span class="text-xs font-medium text-gray-500">Alcance por dia</span>
          <span class="text-[11px] text-gray-400">Últimos 28 dias</span>
        </div>
        <div class="h-32 w-full">
          <svg :viewBox="`0 0 ${W} ${H}`" class="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--bio-accent-400)" stop-opacity="0.35" />
                <stop offset="100%" stop-color="var(--bio-accent-50)" stop-opacity="0.15" />
              </linearGradient>
            </defs>
            <path
              :d="sparklinePaths.area"
              :fill="`url(#${gradientId})`"
              class="transition-opacity"
            />
            <path
              :d="sparklinePaths.line"
              fill="none"
              stroke="var(--bio-accent-400)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="card in cards"
          :key="card.label"
          class="rounded-2xl border border-stone-100 bg-white p-4 transition-all duration-200 hover:border-[color:var(--bio-accent-200)] hover:shadow-sm"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style="background: var(--bio-accent-50)"
            >
              <svg
                class="h-4 w-4"
                style="color: var(--bio-accent-600)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path :d="card.icon" />
              </svg>
            </div>
            <div class="min-w-0 text-lg font-semibold leading-tight tabular-nums text-gray-900">
              {{ card.value }}
            </div>
          </div>
          <div class="mt-2.5">
            <div class="text-[11px] font-normal uppercase tracking-wider text-gray-400">
              {{ card.label }}
            </div>
            <div class="mt-0.5 text-[11px] text-gray-300">
              {{ card.sub }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
