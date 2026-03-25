<script setup lang="ts">
import type { InsightSeriesPoint, InstagramInsightsPayload } from '~/types/instagram-insights'

const { fetch: fetchInsights } = useInstagramInsights()

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const insights = ref<InstagramInsightsPayload | null>(null)

async function load() {
  loading.value = true
  errorMessage.value = null
  try {
    insights.value = await fetchInsights()
  }
  catch (e: unknown) {
    const err = e as {
      data?: { message?: string }
      statusCode?: number
    }
    const code = err.statusCode
    const msg = err.data?.message
    if (code === 404 || msg) {
      errorMessage.value = msg
        ?? 'Ainda não há insights. Conecte o Instagram e rode uma sincronização.'
    }
    else {
      errorMessage.value = 'Não foi possível carregar os insights.'
    }
    insights.value = null
  }
  finally {
    loading.value = false
  }
}

onMounted(load)

function formatInt(n: number | null | undefined): string {
  if (n == null) return '—'
  return new Intl.NumberFormat('pt-BR').format(n)
}

function formatDelta(n: number | null | undefined): string {
  if (n == null) return '—'
  const sign = n > 0 ? '+' : ''
  return `${sign}${new Intl.NumberFormat('pt-BR').format(n)}`
}

function seriesToPolyline(
  series: InsightSeriesPoint[],
  width: number,
  height: number,
): string {
  if (series.length === 0) return ''
  const values = series.map(s => s.value)
  const min = Math.min(0, ...values)
  const max = Math.max(1, ...values)
  const range = max - min || 1
  const last = series.length - 1
  return series
    .map((p, i) => {
      const x = last === 0 ? width / 2 : (i / last) * width
      const y = height - ((p.value - min) / range) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

function topDemographicEntries(
  row: Record<string, number> | null | undefined,
  limit: number,
): { key: string; value: number; pct: number }[] {
  if (!row || Object.keys(row).length === 0) return []
  const entries = Object.entries(row).sort((a, b) => b[1] - a[1])
  const max = entries[0]?.[1] ?? 1
  return entries.slice(0, limit).map(([key, value]) => ({
    key,
    value,
    pct: max > 0 ? Math.round((value / max) * 100) : 0,
  }))
}

function formatDemoKey(key: string): string {
  if (key.includes('_')) {
    const [age, gender] = key.split('_')
    const g = gender === 'F' ? 'Fem.' : gender === 'M' ? 'Masc.' : gender
    return `${age} · ${g}`
  }
  return key
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 class="font-semibold text-gray-900">
          Insights Instagram (28 dias)
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Dados da Graph API após sincronização (permissão <code class="text-xs">instagram_manage_insights</code>).
        </p>
        <p v-if="insights?.synced_at" class="mt-1 text-xs text-gray-400">
          Atualizado em {{ new Date(insights.synced_at).toLocaleString('pt-BR') }}
        </p>
      </div>
      <AppButton type="button" variant="secondary" :loading="loading" @click="load">
        Atualizar
      </AppButton>
    </div>

    <div v-if="loading && !insights" class="mt-6 text-sm text-gray-400">
      Carregando insights…
    </div>

    <p v-else-if="errorMessage && !insights" class="mt-6 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      {{ errorMessage }}
    </p>

    <div v-else-if="insights" class="mt-6 space-y-8">
      <!-- KPIs -->
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p class="text-xs font-medium text-gray-500">Alcance</p>
          <p class="mt-1 text-xl font-semibold text-gray-900">
            {{ formatInt(insights.performance.reach_28d) }}
          </p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p class="text-xs font-medium text-gray-500">Contas engajadas</p>
          <p class="mt-1 text-xl font-semibold text-gray-900">
            {{ formatInt(insights.performance.accounts_engaged_28d) }}
          </p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p class="text-xs font-medium text-gray-500">Interações</p>
          <p class="mt-1 text-xl font-semibold text-gray-900">
            {{ formatInt(insights.performance.total_interactions_28d) }}
          </p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p class="text-xs font-medium text-gray-500">Visitas ao perfil</p>
          <p class="mt-1 text-xl font-semibold text-gray-900">
            {{ formatInt(insights.performance.profile_views_28d) }}
          </p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p class="text-xs font-medium text-gray-500">Δ seguidores (28d)</p>
          <p class="mt-1 text-xl font-semibold text-gray-900">
            {{ formatDelta(insights.performance.follower_count_delta_28d) }}
          </p>
        </div>
      </div>

      <!-- Séries -->
      <div class="grid gap-6 lg:grid-cols-2">
        <div v-if="insights.performance.reach_series?.length">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Alcance por dia
          </h3>
          <svg
            class="mt-2 h-28 w-full text-brand-600"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              :points="seriesToPolyline(insights.performance.reach_series, 100, 40)"
              fill="none"
              stroke="currentColor"
              stroke-width="0.8"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <p class="mt-1 text-[10px] text-gray-400">
            {{ insights.performance.reach_series.length }} pontos · últimos dias da janela
          </p>
        </div>
        <div v-if="insights.performance.accounts_engaged_series?.length">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Contas engajadas por dia
          </h3>
          <svg
            class="mt-2 h-28 w-full text-emerald-600"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              :points="seriesToPolyline(insights.performance.accounts_engaged_series, 100, 40)"
              fill="none"
              stroke="currentColor"
              stroke-width="0.8"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <p class="mt-1 text-[10px] text-gray-400">
            {{ insights.performance.accounts_engaged_series.length }} pontos
          </p>
        </div>
      </div>

      <!-- Audiência -->
      <div class="grid gap-8 lg:grid-cols-3">
        <div v-if="topDemographicEntries(insights.audience.gender_age, 8).length">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Faixa etária e gênero
          </h3>
          <ul class="mt-3 space-y-2">
            <li
              v-for="row in topDemographicEntries(insights.audience.gender_age, 8)"
              :key="row.key"
              class="text-sm"
            >
              <div class="flex justify-between gap-2 text-xs text-gray-600">
                <span>{{ formatDemoKey(row.key) }}</span>
                <span class="tabular-nums text-gray-900">{{ formatInt(row.value) }}</span>
              </div>
              <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full bg-brand-500"
                  :style="{ width: `${row.pct}%` }"
                />
              </div>
            </li>
          </ul>
        </div>
        <div v-if="topDemographicEntries(insights.audience.country, 8).length">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
            País
          </h3>
          <ul class="mt-3 space-y-2">
            <li
              v-for="row in topDemographicEntries(insights.audience.country, 8)"
              :key="row.key"
              class="text-sm"
            >
              <div class="flex justify-between gap-2 text-xs text-gray-600">
                <span>{{ row.key }}</span>
                <span class="tabular-nums text-gray-900">{{ formatInt(row.value) }}</span>
              </div>
              <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full bg-sky-500"
                  :style="{ width: `${row.pct}%` }"
                />
              </div>
            </li>
          </ul>
        </div>
        <div v-if="topDemographicEntries(insights.audience.city, 8).length">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Cidade
          </h3>
          <ul class="mt-3 space-y-2">
            <li
              v-for="row in topDemographicEntries(insights.audience.city, 8)"
              :key="row.key"
              class="text-sm"
            >
              <div class="flex justify-between gap-2 text-xs text-gray-600">
                <span class="truncate">{{ row.key }}</span>
                <span class="shrink-0 tabular-nums text-gray-900">{{ formatInt(row.value) }}</span>
              </div>
              <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full bg-violet-500"
                  :style="{ width: `${row.pct}%` }"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <p
        v-if="
          !topDemographicEntries(insights.audience.gender_age, 1).length
            && !topDemographicEntries(insights.audience.country, 1).length
            && !topDemographicEntries(insights.audience.city, 1).length
        "
        class="text-sm text-gray-500"
      >
        Demografia da audiência ainda vazia (Meta exige amostra mínima, ex.: ≥100 seguidores).
      </p>
    </div>
  </div>
</template>
