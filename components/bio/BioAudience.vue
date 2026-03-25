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
  let fem = 0; let mas = 0
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
  <section v-if="hasData && hasSubData" class="px-5 py-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4">Audiência</p>

      <div class="grid grid-cols-2 gap-2">
        <!-- Age -->
        <div v-if="ageRows.length" class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="mb-3 text-[10px] font-medium uppercase tracking-wider" style="color: var(--bio-muted)">Faixa etária</p>
          <div v-for="row in ageRows" :key="row.label" class="mb-1.5 flex items-center gap-1.5 last:mb-0">
            <span class="w-9 shrink-0 text-[11px]" style="color: var(--bio-sub)">{{ row.label }}</span>
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div class="h-full rounded-full transition-all duration-500" style="background: var(--bio-accent)" :style="{ width: `${row.barWidth}%` }" />
            </div>
            <span class="w-10 shrink-0 text-right text-[10px]" style="color: var(--bio-muted)">{{ row.pct }}%</span>
          </div>
        </div>

        <!-- Top Cities -->
        <div v-if="cities.length" class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="mb-3 text-[10px] font-medium uppercase tracking-wider" style="color: var(--bio-muted)">Top cidades</p>
          <div v-for="city in cities" :key="city.name" class="mb-1.5 flex items-center gap-1.5 last:mb-0">
            <svg class="h-3 w-3 shrink-0" :style="{ color: city.isTop ? 'var(--bio-accent)' : 'var(--bio-muted)' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span
              class="flex-1 truncate text-[11px]"
              :class="city.isTop ? 'font-medium' : ''"
              :style="{ color: city.isTop ? 'var(--bio-text)' : 'var(--bio-sub)' }"
            >{{ city.name }}</span>
            <span
              class="shrink-0 text-[10px]"
              :class="city.isTop ? 'font-medium' : ''"
              :style="{ color: city.isTop ? 'var(--bio-accent)' : 'var(--bio-muted)' }"
            >{{ city.pct }}%</span>
          </div>
        </div>
      </div>

      <!-- Gender donut -->
      <div v-if="gender" class="mt-2 rounded-xl border border-gray-200 bg-white p-4">
        <p class="mb-3 text-[10px] font-medium uppercase tracking-wider" style="color: var(--bio-muted)">Gênero</p>
        <div class="flex items-center gap-5">
          <svg width="64" height="64" viewBox="0 0 72 72" class="shrink-0">
            <circle cx="36" cy="36" r="24" fill="none" stroke="#f0f0ed" stroke-width="10" />
            <circle cx="36" cy="36" r="24" fill="none" stroke="var(--bio-fem)" stroke-width="10" :stroke-dasharray="`${gender.femDash} ${150.8 - gender.femDash}`" stroke-dashoffset="0" transform="rotate(-90 36 36)" class="transition-all duration-700" />
            <circle cx="36" cy="36" r="24" fill="none" stroke="var(--bio-mas)" stroke-width="10" :stroke-dasharray="`${gender.masDash} ${150.8 - gender.masDash}`" :stroke-dashoffset="gender.masOffset" transform="rotate(-90 36 36)" class="transition-all duration-700" />
          </svg>
          <div class="flex-1 space-y-2.5">
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 shrink-0 rounded-full" style="background: var(--bio-fem)" />
              <span class="flex-1 text-[11px]" style="color: var(--bio-sub)">Feminino</span>
              <span class="text-sm font-medium" style="color: var(--bio-text)">{{ gender.femPct }}%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 shrink-0 rounded-full" style="background: var(--bio-mas)" />
              <span class="flex-1 text-[11px]" style="color: var(--bio-sub)">Masculino</span>
              <span class="text-sm font-medium" style="color: var(--bio-text)">{{ gender.masPct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
