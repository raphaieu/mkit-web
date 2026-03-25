<script setup lang="ts">
import type { BioDataSource } from '~/types/creator'

defineProps<{
  title: string
  description?: string
  /** Quando definido, mostra badge de origem (wireframe) */
  source?: BioDataSource
}>()
</script>

<template>
  <section class="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
    <div class="mb-4 flex flex-wrap items-start justify-between gap-2">
      <div>
        <h2 class="font-semibold text-gray-900">{{ title }}</h2>
        <p v-if="description" class="mt-1 text-sm text-gray-500">
          {{ description }}
        </p>
      </div>
      <DashboardDataSourceBadge v-if="source" :source="source" />
    </div>
    <slot />
  </section>
</template>
