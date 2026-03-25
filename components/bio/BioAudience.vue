<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const audience = computed(() => props.creator.insights?.audience ?? null)
const hasData = computed(() => audience.value != null)

function parseAgeRows(genderAge: Record<string, number> | null | undefined) {
  if (!genderAge || Object.keys(genderAge).length === 0) return []
  const buckets: Record<string, number> = {}
  for (const [key, val] of Object.entries(genderAge)) {
    const age = key.split('_')[0]
    buckets[age] = (buckets[age] ?? 0) + val
  }
  const entries = Object.entries(buckets).sort((a, b) => b[1] - a[1])
  const maxVal = entries[0]?.[1] ?? 1
  const total = entries.reduce((s, e) => s + e[1], 0) || 1
  return entries.slice(0, 5).map(([age, val]) => ({
    label: age,
    pct: Math.round((val / total) * 1000) / 10,
    barWidth: Math.round((val / maxVal) * 100),
  }))
}

function parseGender(genderAge: Record<string, number> | null | undefined) {
  if (!genderAge || Object.keys(genderAge).length === 0) return null
  let fem = 0
  let mas = 0
  for (const [key, val] of Object.entries(genderAge)) {
    const g = key.split('_')[1]
    if (g === 'F') fem += val
    else if (g === 'M') mas += val
  }
  const total = fem + mas
  if (total === 0) return null
  return {
    femPct: Math.round((fem / total) * 1000) / 10,
    masPct: Math.round((mas / total) * 1000) / 10,
    femDash: (fem / total) * 150.8,
    masDash: (mas / total) * 150.8,
    masOffset: -(fem / total) * 150.8,
  }
}

function parseCities(data: Record<string, number> | null | undefined, limit: number) {
  if (!data || Object.keys(data).length === 0) return []
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1])
  const total = entries.reduce((s, e) => s + e[1], 0) || 1
  return entries.slice(0, limit).map(([name, val], idx) => ({
    name,
    pct: Math.round((val / total) * 100),
    isTop: idx < 3,
  }))
}

const ageRows = computed(() => parseAgeRows(audience.value?.gender_age))
const gender = computed(() => parseGender(audience.value?.gender_age))
const cities = computed(() => parseCities(audience.value?.city, 6))

const hasSubData = computed(() => ageRows.value.length > 0 || gender.value != null || cities.value.length > 0)
</script>

<template>
  <section v-if="hasData && hasSubData" class="mt-10 px-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4 tracking-[0.1em]">
        Audiência
      </p>

      <div
        class="grid gap-3"
        :class="ageRows.length && cities.length ? 'grid-cols-2' : 'grid-cols-1'"
      >
        <div v-if="ageRows.length" class="rounded-2xl border border-stone-100 bg-white p-5">
          <p class="mb-4 text-xs font-medium text-gray-500">
            Faixa etária
          </p>
          <div v-for="row in ageRows" :key="row.label" class="mb-2.5 flex items-center gap-3 last:mb-0">
            <span class="w-12 shrink-0 text-right text-xs tabular-nums text-gray-500">{{ row.label }}</span>
            <div class="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
              <div
                class="h-full rounded-full transition-all duration-500"
                style="background: var(--bio-accent-400)"
                :style="{ width: `${row.barWidth}%` }"
              />
            </div>
            <span class="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-gray-700">{{ row.pct }}%</span>
          </div>
        </div>

        <div v-if="cities.length" class="rounded-2xl border border-stone-100 bg-white p-5">
          <p class="mb-4 text-xs font-medium text-gray-500">
            Top cidades
          </p>
          <div v-for="city in cities" :key="city.name" class="mb-2.5 flex items-center gap-2 last:mb-0">
            <svg
              class="h-3 w-3 shrink-0"
              :style="{ color: city.isTop ? 'var(--bio-accent-500)' : 'var(--bio-muted)' }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              class="min-w-0 flex-1 truncate text-xs"
              :class="city.isTop ? 'font-medium text-gray-900' : 'text-gray-600'"
            >{{ city.name }}</span>
            <span
              class="shrink-0 text-xs tabular-nums"
              :class="city.isTop ? 'font-medium text-gray-900' : 'text-gray-500'"
            >{{ city.pct }}%</span>
          </div>
        </div>
      </div>

      <div v-if="gender" class="mt-3 rounded-2xl border border-stone-100 bg-white p-5">
        <p class="mb-4 text-xs font-medium text-gray-500">
          Gênero
        </p>
        <div class="flex items-center gap-6">
          <svg width="64" height="64" viewBox="0 0 72 72" class="shrink-0">
            <circle cx="36" cy="36" r="24" fill="none" stroke="#e7e5e4" stroke-width="10" />
            <circle
              cx="36"
              cy="36"
              r="24"
              fill="none"
              stroke="var(--bio-accent-400)"
              stroke-width="10"
              :stroke-dasharray="`${gender.femDash} ${150.8 - gender.femDash}`"
              stroke-dashoffset="0"
              stroke-linecap="round"
              transform="rotate(-90 36 36)"
              class="transition-all duration-700"
            />
            <circle
              cx="36"
              cy="36"
              r="24"
              fill="none"
              stroke="#d6d3d1"
              stroke-width="10"
              :stroke-dasharray="`${gender.masDash} ${150.8 - gender.masDash}`"
              :stroke-dashoffset="gender.masOffset"
              stroke-linecap="round"
              transform="rotate(-90 36 36)"
              class="transition-all duration-700"
            />
          </svg>
          <div class="min-w-0 flex-1 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 shrink-0 rounded-full" style="background: var(--bio-accent-400)" />
                <span class="text-sm text-gray-600">Feminino</span>
              </div>
              <span class="text-sm font-medium tabular-nums text-gray-900">{{ gender.femPct }}%</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-stone-300" />
                <span class="text-sm text-gray-600">Masculino</span>
              </div>
              <span class="text-sm font-medium tabular-nums text-gray-900">{{ gender.masPct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
